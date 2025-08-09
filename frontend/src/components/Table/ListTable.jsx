import React, { useState, useRef, useEffect } from "react";
import CircleAvatar from "../../components/CircleAvatar/CircleAvatar";
import { EllipsisVertical } from "lucide-react";
import Tooltip from "../Tooltip/Tooltip";

const ListTable = ({
  rows = [],
  showEllipsis = false,
  menuItems = [],
  onMenuAction,
  countLabel,
  isCheckboxEnabled = false,
  selectedIds = [],   
  checkboxHandler,   
  showCountLabel = true
}) => {
  const [openIndex, setOpenIndex] = useState(null);
  const rootRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (rootRef.current && !rootRef.current.contains(e.target)) {
        setOpenIndex(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleDropdown = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleCheckboxChange = (id, e) => {
    checkboxHandler(id, e.target.checked);
  };

  return (
    <div ref={rootRef} className="divide-y divide-gray-200">
      {rows.map((row, index) => (
        <div
          key={index}
          className="grid grid-cols-[auto_1fr_auto_auto_auto] items-center py-4 gap-4"
        >
          {/* Ellipsis menu */}
          <div className="relative">
            {showEllipsis && !isCheckboxEnabled ? (
              <>
                <button
                  onClick={() => toggleDropdown(index)}
                  className="p-1 rounded hover:bg-gray-100"
                  aria-expanded={openIndex === index}
                >
                  <EllipsisVertical className="w-5 h-5 text-gray-500" />
                </button>
                {openIndex === index && menuItems?.length > 0 && (
                  <div className="absolute left-0 mt-2 w-44 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                    {menuItems.map((item, i) => (
                      <button
                        key={i}
                        onClick={() => {
                          onMenuAction?.(item.key, row);
                          setOpenIndex(null);
                        }}
                        disabled={item.disabled}
                        className={`w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 relative ${
                          item.disabled
                            ? "opacity-50 cursor-not-allowed"
                            : "cursor-pointer"
                        }`}
                      >
                        {item.label}
                        {item.disabled && (
                          <div className="absolute left-full top-1/2 ml-2 -translate-y-1/2 whitespace-nowrap bg-gray-700 text-white text-xs rounded px-2 py-1 z-50">
                            You have no permission to perform this action.
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <div className="w-6" />
            )}
          </div>

          <div>
            <h3 className="font-medium text-gray-900 truncate">{row.title}</h3>
            <p className="text-sm text-gray-500">
              {row.author} • <Tooltip text={row.date}>{row.date}</Tooltip> • {row.id}
            </p>
            {row.badges ? (
              <div>
                {row.badges.map((badge, i) => (
                  <span
                    key={i}
                    className="inline-block bg-blue-600 text-white text-xs font-semibold px-2 py-1 rounded-full mr-1"
                  >
                    {badge}
                  </span>
                ))}
              </div>
            ) : null}
          </div>

          <div className="flex -space-x-2">
            {row.avatars?.map((name, i) => (
              <CircleAvatar key={i} name={name} />
            ))}
          </div>

          {isCheckboxEnabled || !showCountLabel ? <React.Fragment /> : 
          <div className="flex items-center gap-1 text-gray-500">
            <span className="text-sm">
              {row.count} {countLabel}
            </span>
          </div>}

          {isCheckboxEnabled ? (
            <div className="flex items-center justify-center">
              <input
                type="checkbox"
                className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                checked={selectedIds.includes(parseInt(row.id))}
                onChange={(e) => checkboxHandler(row.id, e)}
              />
            </div>
          ) : (
            <></>
          )}
        </div>
      ))}
    </div>
  );
};

export default ListTable;
