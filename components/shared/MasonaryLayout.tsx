import React, { ReactNode } from 'react';

interface Props {
  columns: number;
  gap: number;
  children: ReactNode[];
}

const MasonaryLayout = ({ columns, gap, children }: Props) => {
  const columnWrapper: Record<string, ReactNode[]> = {};
  const result: JSX.Element[] = [];

  // create columns
  for (let i = 0; i < columns; i++) {
    columnWrapper[`column${i}`] = [];
  }

  // divide children into columns
  for (let i = 0; i < children.length; i++) {
    const columnIndex = i % columns;
    columnWrapper[`column${columnIndex}`].push(
      <div style={{ marginBottom: `${gap}px` }}>
        {children[i]}
      </div>
    );
  }

  // wrap children in each column with a div
  for (let i = 0; i < columns; i++) {
    result.push(
      <div
        style={{
          marginLeft: `${i > 0 ? gap : 0}px`,
          flex: 1,
        }}
        key={`column${i}`}
      >
        {columnWrapper[`column${i}`]}
      </div>
    );
  }

  return (
    <div style={{ display: 'flex' }}>
      {result}
    </div>
  );
};

export default MasonaryLayout;