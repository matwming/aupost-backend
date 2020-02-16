export interface checkResponse {
    readonly  businessid: string,
    readonly codes: {
        adaptation: string,
        detailCode: string,
        detailList: string,
        messages: message[]
    }
}

export type message = {
    readonly code: string,
    readonly value: string
}

export interface customerInfo {
    readonly countryCode: string,
    readonly  address: {
        addressLine1: string,
        locality: string,
        postCode: string,
        province: string
    },
    readonly  identity: {
        dob: string,
        firstName: string,
        lastName: string
    }
}
