import React from "react";
import { Breadcrumb as BootstrapBreadcrumb } from "react-bootstrap";
import { Link } from "react-router-dom";

const Breadcrumb = ({ items }) => {
  return (
    <BootstrapBreadcrumb>
      {items.map((item, index) => (
        <BootstrapBreadcrumb.Item
          key={index}
          active={index === items.length - 1}
        >
          {index === items.length - 1 ? (
            item.text
          ) : (
            <Link to={item.link} className="text-primary">
              {item.text}
            </Link>
          )}
        </BootstrapBreadcrumb.Item>
      ))}
    </BootstrapBreadcrumb>
  );
};

export default Breadcrumb;
