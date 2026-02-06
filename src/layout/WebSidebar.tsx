import styled from "@emotion/styled";
import { FaItunesNote } from "react-icons/fa";
import { FiBookOpen, FiHome, FiMusic, FiUser } from "react-icons/fi";

const menus = [
  { id: "dashboard", label: "홈", icon: FiHome },
  { id: "vocab", label: "단어장", icon: FiBookOpen, active: true },
  { id: "track", label: "트랙 로그", icon: FiMusic },
];

export default function WebSidebar() {
  return (
    <Wrap>
      <Header>
        <Logo><FaItunesNote /></Logo>
        <Brand>Vinsign Vocab</Brand>
      </Header>

      <Nav>
        {menus.map((menu) => {
          const Icon = menu.icon;
          return (
            <NavItem key={menu.id} active={menu.active}>
              <Icon size={20} />
              <span>{menu.label}</span>
            </NavItem>
          );
        })}
      </Nav>

      <Footer>
        <FooterItem>
          <FiUser size={18} />
          <span>마이페이지</span>
        </FooterItem>
        <Logout>로그아웃</Logout>
      </Footer>
    </Wrap>
  );
}

const Wrap = styled.aside`
  background: ${({ theme }) => theme.color.surface};
  border-right: 1px solid ${({ theme }) => theme.color.line};
  padding: 24px 18px 20px;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 34px;
`;

const Logo = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 11px;
  background: linear-gradient(145deg, #18b67a, #008f5a);
  color: #fff;
  display: grid;
  place-items: center;
  font-size: 16px;
  font-weight: 700;
`;

const Brand = styled.div`
  font-size: 22px;
  font-weight: 800;
  color: #0d172f;
`;

const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const NavItem = styled.button<{ active?: boolean }>`
  height: 48px;
  border: 0;
  border-radius: 12px;
  background: ${({ active }) => (active ? "#e8fff5" : "transparent")};
  color: ${({ theme, active }) => (active ? theme.color.blue : "#647089")};
  padding: 0 14px;
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
`;

const Footer = styled.div`
  margin-top: auto;
  color: #66748f;
`;

const FooterItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  height: 42px;
  padding: 0 14px;
`;

const Logout = styled.button`
  border: 0;
  background: transparent;
  color: #8a97b0;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  margin-left: 14px;
`;
