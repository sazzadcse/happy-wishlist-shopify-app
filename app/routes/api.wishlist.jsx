import { json } from "@remix-run/node";

export async function loader () {

	return json( { ok: true, message: "Hello Happy Wishlist API." } );
}

export async function action ( { request } ) {
	const method = request.method;

	switch ( method ) {
		case "POST":
			return json( { ok: true, message: "Hello Happy Wishlist API.", Method: "POST" } );
		case "PATCH":
			return json( { ok: true, message: "Hello Happy Wishlist API.", Method: "PATCH" } );
		case "DELETE":
			return json( { ok: true, message: "Hello Happy Wishlist API.", Method: "DELETE" } );
		default:
			return json( { ok: false, message: "Method not allowed." }, { status: 405 } );
	}

}