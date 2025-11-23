import styled from "styled-components";
import { Tab, Tabs } from "@heroui/tabs";

export const BottomTabsMenuStyled = styled(Tabs)`
  min-height: 60px;
  position: fixed;
  bottom: 0;

  div[data-slot="tabList"] {
    min-height: inherit;
    border-radius: 0;
  }
`;

export const BottomTabsMenuTabStyled = styled(Tab)`
  height: 100%;
`;

export const BottomTabsMenuTitleTabStyled = styled.div<{ selected?: boolean }>`
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
  align-items: center;
  gap: 0;
  height: 52px;

  .title {
    transition: font-size 0.2s ease-in;

    font-size: ${({ selected }) => (selected ? "0.8rem" : "0.75rem")};
  }

  .icon {
    transition:
      width 0.2s ease-in,
      height 0.2s ease-in,
      stroke-width 0.5s ease-in;
    stroke-width: ${({ selected }) => (selected ? 2.5 : 2)};
    height: ${({ selected }) => (selected ? "1.5rem" : "1rem")};
    width: ${({ selected }) => (selected ? "1.5rem" : "1rem")};
  }
`;
