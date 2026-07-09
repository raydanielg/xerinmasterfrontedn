import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setConfigData } from "redux/slices/configData";
import Router from "next/router";
import SEO from "../src/components/seo";
import { useGetConfigData } from "../src/api-manage/hooks/useGetConfigData";
import { filterAllowedModules } from "helper-functions/moduleFilter";

const Root = (props) => {
	const { configData } = props;
	const dispatch = useDispatch();
	const { data: dataConfig, refetch: configRefetch } = useGetConfigData();
	useEffect(() => {
		configRefetch();
	}, []);
	useEffect(() => {
		if (dataConfig) {
			if (dataConfig.length === 0) {
				Router.push("/404");
			} else if (dataConfig?.maintenance_mode) {
				Router.push("/maintainance");
			} else {
				dispatch(setConfigData(dataConfig));
				let allowedModules = filterAllowedModules(dataConfig?.modules || []);
				// Fallback when backend returns module: null but module_config exists
				if (allowedModules.length === 0 && dataConfig?.module_config?.module_type?.includes("ecommerce")) {
					allowedModules = [{ module_type: "ecommerce", slug: "ecommerce", id: 4 }];
				}
				const ecommerceModule = allowedModules.find(
					(m) => m.module_type === "ecommerce"
				) || allowedModules[0];
				if (ecommerceModule) {
					const moduleSlug = ecommerceModule.slug || ecommerceModule.id;
					Router.replace(`/home?module=${moduleSlug}`);
				}
			}
		}
	}, [dataConfig]);
	return (
		<>
			<SEO
				businessName={configData?.business_name}
				configData={configData}
				title={configData?.business_name}
				description={configData?.meta_description}
			/>
		</>
	);
};
export default Root;
export const getServerSideProps = async (context) => {
	const { req, res } = context;
	const language = req.cookies.languageSetting;

	const configRes = await fetch(
		`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/config`,
		{
			method: "GET",
			headers: {
				"X-software-id": 33571750,
				"X-server": "server",
				"X-localization": language,
				origin: process.env.NEXT_CLIENT_HOST_URL,
			},
		}
	);
	const config = await configRes.json();
	res.setHeader(
		"Cache-Control",
		"public, s-maxage=3600, stale-while-revalidate"
	);

	return {
		props: {
			configData: config,
		},
	};
};