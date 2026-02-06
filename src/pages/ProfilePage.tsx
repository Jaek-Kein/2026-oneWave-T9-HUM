import { useEffect } from "react";
import styled from "@emotion/styled";
import MobileShell from "../layout/MobileShell";
import WebShell from "../layout/WebShell";
import { useMediaQuery } from "../shared/hooks/useMediaQueryl";
import { useWordStore } from "../store/useWordStore";

export default function ProfilePage() {
  const isMobile = useMediaQuery("(max-width: 1023px)");
  const { user, profile, fetchAppData } = useWordStore();

  useEffect(() => {
    fetchAppData();
  }, [fetchAppData]);

  const profileCard = (
    <Card>
      <h2>{user.name}님의 프로필</h2>
      <p>이메일: {profile.email}</p>
      <p>학습 레벨: {profile.level}</p>
      <p>연속 학습: {profile.streakDays}일</p>
      <p>선호 언어: {profile.favoriteLanguage}</p>
      <p>캡처 단어: {profile.totalCapturedWords}개</p>
      <p>캡처 트랙: {profile.totalCapturedTracks}개</p>
    </Card>
  );

  if (isMobile) {
    return (
      <MobileShell title="프로필" totalCount={profile.totalCapturedWords} query="" onChangeQuery={() => undefined}>
        {profileCard}
      </MobileShell>
    );
  }

  return (
    <WebShell query="" onChangeQuery={() => undefined} userName={user.name} onAdd={() => undefined}>
      <Content>{profileCard}</Content>
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
    margin: 0 0 12px;
    font-size: 24px;
    color: #061234;
  }

  p {
    margin: 8px 0 0;
    color: #7f8ca7;
  }
`;
