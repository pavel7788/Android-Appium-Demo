export interface ShippingInfo {
    fullName:  string
    address1:  string
    address2?: string
    city:      string
    state:     string
    zip:       string
    country:   string
}

export interface PaymentInfo {
    cardholderName: string
    cardNumber:     string
    expirationDate: string
    securityCode:   string
}
