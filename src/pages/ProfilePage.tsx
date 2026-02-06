import styled from "@emotion/styled";
import MobileShell from "../layout/MobileShell";
import WebShell from "../layout/WebShell";
import { useMediaQuery } from "../shared/hooks/useMediaQueryl";

export default function ProfilePage() {
  const isMobile = useMediaQuery("(max-width: 1023px)");

  if (isMobile) {
    return (
      <MobileShell title="프로필" totalCount={0} query="" onChangeQuery={() => undefined}>
        <Card>
          <h2>내 정보</h2>
          <p>프로필 페이지 준비 중입니다.</p>
        </Card>
      </MobileShell>
    );
  }

  return (
    <WebShell query="" onChangeQuery={() => undefined} userName="김민수님" onAdd={() => undefined}>
      <Content>
        <Card>
          <h2>내 정보</h2>
          <p>프로필 페이지 준비 중입니다.</p>
        </Card>
      </Content>
    </WebShell>
  );
}

const Content = styled.main`
  padding: 16px 24px 20px;
`;

const Card = styled.section`
  border-radius: 14px;
  background: ${({ theme }) => theme.color.surface};
  border: 1px solid ${({ theme }) => theme.color.line};
  box-shadow: ${({ theme }) => theme.shadow.sm};
  padding: 20px;

  h2 {
    margin: 0;
    font-size: 24px;
    color: #061234;
  }

  p {
    margin: 8px 0 0;
    color: #7f8ca7;
  }
`;
