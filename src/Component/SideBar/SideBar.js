// npm package import
import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";

// import of local files
import "./SideBar.scss";

const SideBar = () => {
  const [active, setActive] = useState(true);
  const toggleSideBar = () => {
    setActive(!active);
  };
  const dummy = [
    {
      name: "Home",
      path: "/",
      children: [],
    },
    {
      name: "Routes",
      path: "",
      children: [
        { name: "Чиглэл 1", path: "/route/1" },
        { name: "Чиглэл 3", path: "/route/3" },
        { name: "Чиглэл 4", path: "/route/4" },
        { name: "Чиглэл 5", path: "/route/5" },
        { name: "Чиглэл 6", path: "/route/6" },
      ],
    },
    {
      name: "Bus stops",
      path: "",
      children: [
        { name: "Их залуу эцэс", path: "/bus/1" },
        { name: "Баруун задгай 20", path: "/bus/2" },
        { name: "Хабитат 15", path: "/bus/3" },
        { name: "Овоот 8", path: "/bus/4" },
        { name: "Овоот 4", path: "/bus/5" },
        { name: "Авзага", path: "/bus/6" },
        { name: "Дугуй засвар", path: "/bus/7" },
        { name: "Андууд", path: "/bus/8" },
        { name: "Сүлд дэлгүүр", path: "/bus/9" },
        { name: "Улаан худаг Ч1", path: "/bus/10" },
        { name: "Дэвжих хос дэлгүүр", path: "/bus/11" },
        { name: "Цэцэрлэгт хүрээлэн", path: "/bus/12" },
        { name: "Дэнж дэлгүүр", path: "/bus/13" },
        { name: "Илгээлт 2", path: "/bus/14" },
        { name: "Асгат дэлгүүр", path: "/bus/15" },
        { name: "Өргөө синема", path: "/bus/16" },
        { name: "Хаан банк", path: "/bus/17" },
      ],
    },
  ];

  const LinkHandler = (props) => {
    const [opened, setOpened] = useState(false);
    console.log(props);
    const toggleOpen = () => {
      setOpened(!opened);
    };
    return (
      <div>
        {props.data.children.length === 0 ? (
          <NavLink to={props.data.path}>{props.data.name}</NavLink>
        ) : (
          <div onClick={toggleOpen}>
            {props.data.name}
            <div className={`children ${opened}`}>
              {opened &&
                props.data.children.map((item) => {
                  return <NavLink to={item.path}>{item.name}</NavLink>;
                })}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={`sidebar ${active}`}>
      {/* <button onClick={toggleSideBar}>|||</button> */}
      {/* <div className="sidebar_title"> */}
        {/* <div className="sidebar_img"> */}
          {/* <img src={logo} alt="logo" /> */}
          {/* <h1>Erdenet bus</h1>
      </div>
      </div> */}
      
      <div className="link-list">
        {dummy &&
          dummy.map((nav) => {
            return <LinkHandler data={nav} />;
          })}
      </div>
    </div>
  );
};

export { SideBar };
