import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

import Button from "../../common/Button";
import CardPreview from "../../common/CardPreview";
import InputBoxCardNumber from "../InputBoxCardNumber/InputBoxCardNumber";
import InputBoxExpirationDate from "../InputBoxExpirationDate/InputBoxExpirationDate";
import InputBoxOwner from "../InputBoxOwner/InputBoxOwner";
import InputBoxPassword from "../InputBoxPassword/InputBoxPassword";
import InputBoxSecurityCode from "../InputBoxSecurityCode/InputBoxSecurityCode";
import CardCoModal from "../../common/CardCoModal";

import { CardCo, CreditCard, InputStatus } from "../../../type";
import { initialCard } from "../../../cardData";

import "./cardInputForm.css";

interface CardInputFormProps {
  addNewCard: (card: CreditCard) => void;
}

const cardInputComplete = {
  cardCo: false,
  cardNumber: false,
  expirationDate: false,
  owner: false,
  securityCode: false,
  password: false,
};

const useCardCoModalState = () => {
  const [modalOpen, setModalOpen] = useState(true);

  function openCardCoModal() {
    setModalOpen(true);
  }

  function closeCardCoModal() {
    setModalOpen(false);
  }

  return { modalOpen, openCardCoModal, closeCardCoModal };
};

const useCardInfoAndInputState = (closeModal: Function) => {
  const [inputStatus, setInputStatus] =
    useState<InputStatus>(cardInputComplete);
  const [nowCardInfo, setNowCardInfo] = useState<CreditCard>(initialCard);

  const changeInputStatus = (inputName: keyof InputStatus) => {
    return (completeState: boolean, value?: string, index?: number) => {
      // 완료/미완료 setting
      const changeInputStatus = JSON.parse(JSON.stringify(inputStatus));
      changeInputStatus[inputName] = completeState;
      setInputStatus(changeInputStatus);

      //user input 입력
      if (!completeState || value === undefined) return;

      const changeNowCard = JSON.parse(JSON.stringify(nowCardInfo));
      if (inputName === "cardCo") {
        changeNowCard[inputName] = value as CardCo;
        setNowCardInfo(changeNowCard);
        closeModal();
      } else if (inputName !== "cardNumber" && inputName !== "password") {
        changeNowCard[inputName] = value;
        setNowCardInfo(changeNowCard);
      } else if (index !== undefined) {
        changeNowCard[inputName][index] = value;
        setNowCardInfo(changeNowCard);
      }
    };
  };
  return { inputStatus, nowCardInfo, changeInputStatus };
};

export default function CardInputForm(props: CardInputFormProps) {
  const { modalOpen, openCardCoModal, closeCardCoModal } =
    useCardCoModalState();

  const isFormFilled = useRef(false);
  const { inputStatus, nowCardInfo, changeInputStatus } =
    useCardInfoAndInputState(closeCardCoModal);
  const { cardNumber, expirationDate, securityCode, password } = inputStatus;
  isFormFilled.current =
    cardNumber && expirationDate && securityCode && password;

  const navigate = useNavigate();
  const { addNewCard } = props;
  const submitCardInfo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isFormFilled.current) {
      addNewCard(nowCardInfo);
      navigate("/CardNickInputPage");
    }
  };

  return (
    <form onSubmit={(e) => submitCardInfo(e)} className="form">
      {modalOpen && (
        <CardCoModal
          cardCoList={[
            "woori",
            "shinhan",
            "hana",
            "hyundai",
            "lotte",
            "bc",
            "kb",
            "kakao",
          ]}
          changeCardCoStatus={changeInputStatus("cardCo")}
        />
      )}
      <CardPreview card={nowCardInfo} openCardCoModal={openCardCoModal} />
      <InputBoxCardNumber
        changeCardNumberStatus={changeInputStatus("cardNumber")}
      />
      <InputBoxExpirationDate
        changeCardExpirationDateStatus={changeInputStatus("expirationDate")}
      />
      <InputBoxOwner changeCardOwnerStatus={changeInputStatus("owner")} />
      <InputBoxSecurityCode
        changeSecurityCodeStatus={changeInputStatus("securityCode")}
      />
      <InputBoxPassword changePasswordStatus={changeInputStatus("password")} />
      <Button
        type="submit"
        style={isFormFilled.current ? {} : { color: "lightgrey" }}
      >
        다음
      </Button>
    </form>
  );
}
