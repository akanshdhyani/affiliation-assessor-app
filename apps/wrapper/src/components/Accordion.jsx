import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faRightFromBracket,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

const { useState } = React

const minusIcon = '-'
const plusIcon = '+'

function Accordion({ title, content }) {
  const [expanded, setExpanded] = useState(false)
  const toggleExpanded = () => setExpanded((current) => !current)

  return (
    <div className="text-white bg-primary transition-all duration-300 hover:bg-primary hover:text-white hover:text-primary border-primary border-1 mb-0 font-medium py-3 mt-6 w-full text-[18px]" onClick={toggleExpanded}>
      <div className="px-8 text-left items-center h-10 select-none flex justify-between flex-row">
        <h5 className="flex-1">
          {title}
        </h5>
        <div className="flex-none pl-2">{expanded ? minusIcon : plusIcon}</div>
      </div>
      <div className={`px-6 pt-0 bg-orange-100 overflow-hidden transition-[max-height] duration-500 ease-in ${expanded ? "max-h-40" : "max-h-0"}`}>
        <p className="pb-4 text-left">
          {content}
        </p>
      </div>
    </div>
  )
}
export default Accordion

