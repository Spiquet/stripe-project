/* eslint-disable testing-library/prefer-screen-queries */
import * as React from "react";

import { customRender } from "../../testing-utils/customRender";
import { Account } from "./Account";
import { meQuery } from "../../graphql/queries/me";

const mePaidUserMock = {
    request: {
        query: meQuery,
        variables: {}
    },
    result: {
        data: {
            me: {
                id: "123",
                email: "bob@bob.com",
                type: "paid",
                ccLast4: "4372"
            }
        }
    }
};


const meFreeTrialUserMock = {
    request: {
        query: meQuery,
        variables: {}
    },
    result: {
        data: {
            me: {
                id: "123",
                email: "bob@bob.com",
                type: "free-trial",
                ccLast4: null
            }
        }
    }
};

const meNullMock = {
    request: {
        query: meQuery,
        variables: {}
    },
    result: {
        data: {
            me: null
        }
    }
};

const waitForData = () => new Promise(res => setTimeout(res, 0));

describe("account", () => {

    console.log(mePaidUserMock.result);

    it("paid user", async () => {
        const { getByTestId } = customRender(< Account />, [mePaidUserMock]);
        await waitForData();
        const el = getByTestId('cc-number');

        console.log(el);

        expect(el.textContent).toContain('4372');

        expect(el).toBeInTheDocument()
    });

    it("free trial", async () => {
        const { getByText } = customRender(<Account />, [meFreeTrialUserMock]);
        await waitForData();
        expect(getByText("Pay With Card")).toBeDefined();
    });

    it("not authenticated", async () => {
        const { history } = customRender(<Account />, [meNullMock]
        );
        await waitForData();
        expect(history.location.pathname).toEqual("/login");
    });
});