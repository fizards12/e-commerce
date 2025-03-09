import {
    ActionFunction,
    ActionFunctionArgs,
    LoaderFunction,
    redirect,
} from "react-router-dom";
import { IUser } from "../../../schemas/user";
import store from "../../../stores";
import { login, register } from "../../../services/auth";
import { getUser } from "../../../services/users";
import { call } from "../../../services/call";
import { GeneralError } from "../../../services/error";
import { getRoles } from "../../../services/roles";

export const loginAction: ActionFunction = async ({
    request,
}: ActionFunctionArgs): Promise<Response> => {
    const formData = await request.formData();
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
        const data = await call(login, [email, password]);
        const response = await call(getUser, [data.id]);
        store.dispatch({ type: "auth/login", payload: response.user });
        redirect("/");
        return new Response(
            JSON.stringify({ message: "Login successful", status: 200 }),
            { status: 200, headers: { "Content-Type": "application/json" } }
        );
    } catch (err) {
        const error = err as GeneralError;
        return new Response(JSON.stringify({ error: error.message }), {
            status: error.status,
            headers: { "Content-Type": "application/json" },
        });
    }
};

export const registerAction: ActionFunction = async ({
    request,
}: ActionFunctionArgs): Promise<Response> => {
    const formData = await request.formData();
    const user: IUser & { confirmPassword?: string } =
        Object.fromEntries(formData);
    delete user.confirmPassword;

    try {
        await call(register, [user]);
        return new Response(
            JSON.stringify({ message: "User registered successfully", status: 200 }),
            { status: 200, headers: { "Content-Type": "application/json" } }
        );
    } catch (err) {
        const error = err as GeneralError;
        return new Response(
            JSON.stringify({ error: error.message }),
            {
                status: error.status,
                headers: { "Content-Type": "application/json" },
            }
        );
    }
};

export const registerLoader: LoaderFunction = async () => {
    try {
        const response = await call(getRoles, []);
        return response.roles;
    } catch (error) {
        console.error(error);
        return [];
    }
};
