import {
	Box,
	Card,
	Layout,
	Link,
	List,
	Page,
	Text,
	BlockStack,
	TextField,
	InlineGrid,
	Divider,
	useBreakpoints,
	Button,
} from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import { useState } from "react";
import { json } from "@remix-run/node";
import { useLoaderData, Form } from "@remix-run/react";
import { authenticate } from "../shopify.server";

// Import db client from the database module
import db from "../db.server";


export const loader = async ( { request, params } ) => {
	const { session } = await authenticate.admin( request );
	const { shop } = session;

	console.log( "params id :", shop );

	const settings = await db.Settings.findFirst( {
		where: {
			shop: shop,
		},
	} );

	return json( { settings } );
};

export async function action ( { request } ) {
	const { session } = await authenticate.admin( request );
	const { shop } = session;

	const formData = await request.formData();
	const data = Object.fromEntries( formData );

	// First try to update existing record
	const updatedSettings = await db.settings.updateMany( {
		where: { shop },
		data: {
			name: data.name,
			description: data.description,
		},
	} );

	// If no records were updated, create a new one
	if ( updatedSettings.count === 0 ) {
		await db.settings.create( {
			data: {
				shop,
				name: data.name,
				description: data.description,
			},
		} );
	}

	// Return the current settings
	const settings = await db.settings.findFirst( {
		where: { shop },
	} );

	return json( { settings } );
}

export default function SettingsPage () {

	const { smUp } = useBreakpoints();

	const { settings } = useLoaderData();

	const [ formState, setFormState ] = useState( settings );

	return (
		<Page>
			<TitleBar title="Settings" />
			<BlockStack gap={{ xs: "800", sm: "400" }}>
				<InlineGrid columns={{ xs: "1fr", md: "2fr 5fr" }} gap="400">
					<Box
						as="section"
						paddingInlineStart={{ xs: 400, sm: 0 }}
						paddingInlineEnd={{ xs: 400, sm: 0 }}
					>
						<BlockStack gap="400">
							<Text as="h3" variant="headingMd">
								Settings
							</Text>
							<Text as="p" variant="bodyMd">
								Update app settings to customize the app experience for your
								users.
							</Text>
						</BlockStack>
					</Box>
					<Card roundedAbove="sm">
						<Form method="POST">
							<BlockStack gap="400">
								<TextField
									label="App name"
									name="name"
									placeholder="App name"
									value={formState?.name}
									onChange={( value ) => setFormState( { ...formState, name: value } )}
								/>
								<TextField
									label="Description"
									name="description"
									placeholder="Description"
									value={formState?.description}
									onChange={( value ) => setFormState( { ...formState, description: value } )}
								/>
								<Button submit={true}>Save</Button>
							</BlockStack>
						</Form>
					</Card>
				</InlineGrid>
			</BlockStack>
		</Page>
	);
}

function Code ( { children } ) {
	return (
		<Box
			as="span"
			padding="025"
			paddingInlineStart="100"
			paddingInlineEnd="100"
			background="bg-surface-active"
			borderWidth="025"
			borderColor="border"
			borderRadius="100"
		>
			<code>{children}</code>
		</Box>
	);
}
