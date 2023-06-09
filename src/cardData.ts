import { CreditCard } from "./type";

export const initialCard: CreditCard = {
  nickName: "",
  owner: "",
  expirationDate: "",
  cardCo: "woori",
  cardNumber: ["", "", "", ""],
  securityCode: "",
  password: ["", ""],
};

export const filledCard_test: CreditCard = {
  nickName: "하나의 카드",
  owner: "HANA KIM",
  expirationDate: "12/23",
  cardCo: "hana",
  cardNumber: ["1234", "5678", "9984", "1245"],
  securityCode: "124",
  password: ["1", "6"],
};

export const filledCardWithoutOwner_test: CreditCard = {
  nickName: "",
  owner: "HANA KIM",
  expirationDate: "12/23",
  cardCo: "woori",
  cardNumber: ["0000", "0000", "9984", "1245"],
  securityCode: "124",
  password: ["1", "6"],
};
