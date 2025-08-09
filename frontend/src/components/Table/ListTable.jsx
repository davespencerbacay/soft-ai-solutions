import { useState, useRef, useEffect } from "react";
import CircleAvatar from "../../components/CircleAvatar/CircleAvatar";
import { EllipsisVertical } from "lucide-react";
import Tooltip from "../Tooltip/Tooltip";

const ListTable = ({ rows = [], showEllipsis = false, menuItems = [], onMenuAction, countLabel }) => {
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

  return (
    <div ref={rootRef} className="divide-y divide-gray-200">
      {rows.map((row, index) => (
        <div key={index} className="grid grid-cols-[auto_1fr_auto_auto] items-center py-4 gap-4">
          <div className="relative">
            {showEllipsis ? (
              <>
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="p-1 rounded hover:bg-gray-100"
                  aria-expanded={openIndex === index}
                >
                  <EllipsisVertical className="w-5 h-5 text-gray-500" />
                </button>

                {openIndex === index && menuItems && menuItems.length > 0 && (
                  <div className="absolute left-0 mt-2 w-44 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                    {menuItems.map((item, i) => (
                      <button
                        key={i}
                        onClick={() => {
                          onMenuAction?.(item.key, row);
                          setOpenIndex(null);
                        }}
                        disabled={item.disabled}
                        className={`w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 relative ${item.disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
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
          </div>

          <div className="flex -space-x-2">
            {row.avatars?.map((name, i) => (
              <CircleAvatar key={i} name={name} />
            ))}
          </div>

          <div className="flex items-center gap-1 text-gray-500">
            <span className="text-sm">{row.count} {countLabel}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ListTable;
