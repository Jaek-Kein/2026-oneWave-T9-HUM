import styled from "@emotion/styled";
import { FiBookOpen, FiHome, FiMusic, FiUser } from "react-icons/fi";

const menus = [
  { id: "dashboard", label: "홈", icon: FiHome },
  { id: "vocab", label: "단어장", icon: FiBookOpen, active: true },
  { id: "track", label: "플레이리스트", icon: FiMusic },
  { id: "my", label: "마이페이지", icon: FiUser },
];

export default function MobileBottomNav() {
  return (
    <Wrap>
      {menus.map((menu) => {
        const Icon = menu.icon;
        return (
          <Item key={menu.id} active={menu.active}>
            <Icon size={20} />
            <span>{menu.label}</span>
          </Item>
        );
      })}
    </Wrap>
  );
}

const Wrap = styled.nav`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  height: 72px;
  background: ${({ theme }) => theme.color.surface};
  border-top: 1px solid ${({ theme }) => theme.color.line};
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  z-index: 20;
`;

const Item = styled.button<{ active?: boolean }>`
  border: 0;
  background: transparent;
  color: ${({ theme, active }) => (active ? theme.color.blue : "#98a2b5")};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  font-size: 11px;
  font-weight: ${({ active }) => (active ? 700 : 600)};
`;
