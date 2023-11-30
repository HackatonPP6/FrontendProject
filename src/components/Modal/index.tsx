import * as S from "./styles";
import { ModalProps } from "@mui/material";

interface IModalProps extends ModalProps {}

const Modal = ({ children, ...rest }: IModalProps) => (
  <S.Wrapper {...rest}>
    <S.Container>{children}</S.Container>
  </S.Wrapper>
);

export { Modal };
