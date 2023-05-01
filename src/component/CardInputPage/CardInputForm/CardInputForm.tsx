import Button from "../../common/Button";
import CardPreview from "../../common/CardPreview";
import InputBoxCardNumber from "../InputBoxCardNumber/InputBoxCardNumber";
import InputBoxExpirationDate from "../InputBoxExpirationDate/InputBoxExpirationDate";
import InputBoxOwner from "../InputBoxOwner/InputBoxOwner";
import InputBoxPassword from "../InputBoxPassword/InputBoxPassword";
import InputBoxSecurityCode from "../InputBoxSecurityCode/InputBoxSecurityCode";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "./cardInputForm.css";
import { CreditCard, InputStatus } from "../../../type";
import { EachUserInputState } from "../../../type";
import CardCoModal from "../../common/CardCoModal";
import { initialCard } from "../../../cardData";

interface CardInputFormProps {
  addNewCard: (card: CreditCard) => void;
}

const initialArrayInputState: EachUserInputState = {
  isComplete: false,
  userInput: [],
};
const initialStringInputState: EachUserInputState = {
  isComplete: false,
  userInput: "",
};
const initialCardCoInputState: EachUserInputState = {
  isComplete: false,
  userInput: "woori",
};

const initialInputStatus = {
  cardCo: initialCardCoInputState,
  cardNumber: initialArrayInputState,
  expirationDate: initialStringInputState,
  owner: initialStringInputState,
  securityCode: initialStringInputState,
  password: initialArrayInputState,
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

export default function CardInputForm(props: CardInputFormProps) {
  const { addNewCard } = props;

  const [isFormFilled, setIsFormFilled] = useState(false);
  const [inputStatus, setInputStatus] =
    useState<InputStatus>(initialInputStatus);
  const [nowCardInfo, setNowCardInfo] = useState<CreditCard>(initialCard);
  const { modalOpen, openCardCoModal, closeCardCoModal } =
    useCardCoModalState();
  const navigate = useNavigate();

  const changeInputStatus = (inputName: keyof InputStatus) => {
    return (key: keyof EachUserInputState, value: any, index?: number) => {
      setInputStatus((currentInputStatus) => {
        const updateResult = JSON.parse(JSON.stringify(currentInputStatus));
        const originNowCard = JSON.parse(JSON.stringify(nowCardInfo));

        if (key === "isComplete") {
          updateResult[inputName][key] = value;
          return updateResult;
        }

        if (
          (inputName === "cardNumber" || inputName === "password") &&
          index !== undefined
        ) {
          updateResult[inputName][key][index] = value;
          originNowCard[inputName][index] = value;
          setNowCardInfo(originNowCard);
          return updateResult;
        } else if (inputName === "cardCo") {
          closeCardCoModal();
        }

        updateResult[inputName][key] = value;
        originNowCard[inputName] = value;
        setNowCardInfo(originNowCard);

        return updateResult;
      });
    };
  };

  useEffect(() => {
    const { cardNumber, expirationDate, securityCode, password } = inputStatus;
    setIsFormFilled(
      cardNumber.isComplete &&
        expirationDate.isComplete &&
        securityCode.isComplete &&
        password.isComplete
    );
  }, [inputStatus]);

  const submitCardInfo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isFormFilled) {
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
      <Button type="submit" style={isFormFilled ? {} : { color: "lightgrey" }}>
        다음
      </Button>
    </form>
  );
}
