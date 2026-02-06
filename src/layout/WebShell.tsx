import styled from "@emotion/styled";
import WebSidebar from "./WebSidebar";
import TopSearchBar from "./TopSearchBar";

export default function WebShell(props: {
  query: string;
  onChangeQuery: (v: string) => void;
  userName: string;
  onAdd: () => void;
  children: React.ReactNode;
}) {
  return (
    <Layout>
      <WebSidebar />
      <Main>
        <Topbar>
          <TopSearchBar value={props.query} onChange={props.onChangeQuery} wide />
          <UserArea>
            <UserName>{props.userName}</UserName>
            <Avatar>
              <AvatarText>?</AvatarText>
            </Avatar>
          </UserArea>
        </Topbar>
        <Body>{props.children}</Body>
      </Main>
    </Layout>
  );
}

const Layout = styled.div`
  height: 100dvh;
  display: grid;
  grid-template-columns: 280px 1fr;
  overflow: hidden;
`;

const Main = styled.div`
  background: ${({ theme }) => theme.color.bg};
  min-height: 0;
  display: grid;
  grid-template-rows: 86px minmax(0, 1fr);
`;

const Topbar = styled.div`
  height: 86px;
  padding: 0 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Body = styled.div`
  padding: 2px 0 0;
  min-height: 0;
  overflow-y: hidden;
`;

const UserArea = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const UserName = styled.span`
  color: ${({ theme }) => theme.color.text};
  font-weight: 700;
  font-size: 16px;
`;

const Avatar = styled.div`
  width: 42px;
  height: 42px;
  border-radius: 999px;
  background: linear-gradient(145deg, #2a2f38, #13161d);
  display: grid;
  place-items: center;
`;

const AvatarText = styled.span`
  color: #fff;
  font-weight: 700;
  font-size: 14px;
`;
