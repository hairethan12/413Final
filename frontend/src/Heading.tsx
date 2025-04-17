import React, { JSX } from 'react';

// This is reading what size the header is
interface HeadingProps {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  children: React.ReactNode;
}

// Creates a tag for the header. Sets size and class
const Heading: React.FC<HeadingProps> = ({ level = 1, children }) => {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;

  return <Tag className="fw-bold text-center my-4">{children}</Tag>;
};

export default Heading;
