import styled from "@emotion/styled";
import TopSearchBar from "./TopSearchBar";
import MobileBottomNav from "./MobileBottomNav";
import { FaItunesNote } from "react-icons/fa";

export default function MobileShell(props: {
  title: string;
  totalCount: number;
  query: string;
  onChangeQuery: (v: string) => void;
  onAdd: () => void;
  children: React.ReactNode;
}) {
  return (
    <Wrap>
      <Header>
        <BrandRow>
          <Brand>
            <Logo><FaItunesNote /></Logo>
            <BrandName>Vinsign</BrandName>
          </Brand>
          <Avatar>?</Avatar>
        </BrandRow>

        <TopSearchBar value={props.query} onChange={props.onChangeQuery} />
      </Header>

      <Body>
        <TitleRow>
          <div>
            <H1>{props.title}</H1>
            <Sub>
              총 <b>{props.totalCount}</b>개의 단어 저장됨
            </Sub>
          </div>
          <AddBtn onClick={props.onAdd}>+</AddBtn>
        </TitleRow>

        {props.children}
      </Body>

      <MobileBottomNav />
    </Wrap>
  );
}

const Wrap = styled.div`
  min-height: 100%;
  background: ${({ theme }) => theme.color.bg};
`;

const Header = styled.header`
  padding: 20px 20px 14px;
`;

const BrandRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 14px;
`;

const Brand = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Logo = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 9px;
  background: linear-gradient(145deg, #1a65ff, #0058ff);
  display: grid;
  place-items: center;
  color: #fff;
  font-weight: 700;
`;

const BrandName = styled.div`
  font-weight: 800;
  font-size: 34px;
  color: #0d172f;
`;

const Avatar = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 999px;
  background: linear-gradient(145deg, #2a2f38, #13161d);
  color: #fff;
  display: grid;
  place-items: center;
  font-size: 13px;
  font-weight: 700;
`;

const Body = styled.main`
  padding: 0 20px;
`;

const TitleRow = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin: 8px 0 14px;
`;

const H1 = styled.h1`
  margin: 0;
  font-size: 42px;
`;

const Sub = styled.p`
  margin: 4px 0 0;
  font-size: 20px;
  color: ${({ theme }) => theme.color.subtext};
  b {
    color: ${({ theme }) => theme.color.blue};
    font-weight: 700;
  }
`;

const AddBtn = styled.button`
  width: 44px;
  height: 44px;
  border-radius: 14px;
  border: 0;
  background: ${({ theme }) => theme.color.blue};
  color: #fff;
  font-size: 26px;
  box-shadow: ${({ theme }) => theme.shadow.sm};
  cursor: pointer;
`;
