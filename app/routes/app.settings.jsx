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

export async function loader () {
	// get the settings from the database
	// const settings = await getSettingsFromDatabase();
	const settings = {
		name: "Happy Wishlist",
		description: "A wishlist app for Shopify",
	};

	return json( { settings } );
}

export async function action ( { request } ) {
	const formData = await request.formData();
	const settings = Object.fromEntries( formData );

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
									value={formState.name}
									onChange={( value ) => setFormState( { ...formState, name: value } )}
								/>
								<TextField
									label="Description"
									name="description"
									placeholder="Description"
									value={formState.description}
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
