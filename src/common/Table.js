import Card from "@material-tailwind/react/Card";
import CardHeader from "@material-tailwind/react/CardHeader";
import CardBody from "@material-tailwind/react/CardBody";
import Label from "@material-tailwind/react/Label";
import SearchBox from "./SearchBox";
import SelectSearch from "./SelectSearch";
import Zoom from "react-medium-image-zoom";

export default function CardTable({
  title,
  arrTitle,
  arrContent,
  arrActivity,
  onAdd,
  setSearch,
  className,
  searchNull,
  setOption,
  arrOption,
  children
}) {
  const renderObjectElement = (element) => {
    const list = [];
    for (const property in element) {
      const item = (
        <th className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
          {element[property]?.toString().startsWith("http") ? (
            <Zoom zoomMargin>
              <img className="w-16 h-16 " src={element[property]} alt="Img" />
            </Zoom>
          ) : element[property]?.toString().length > 50 ? (
            element[property].toString().slice(0, 50) + "..."
          ) : (
            element[property]
          )}
        </th>
      );
      list.push(item);
    }
    return list;
  };
  return (
    <Card className={className}>
      <CardHeader color="purple" contentPosition="left">
        <h2 className="text-white text-2xl">{title}</h2>
      </CardHeader>
      <CardBody>
        <div className="mb-10">
            {children}
        </div>
        <div className="flex flex-wrap gap-y-4 items-center gap-x-10 mb-4 justify-between sm:justify-start">
          {searchNull ? null : <SearchBox setSearch={setSearch} />}
          {setOption ? (
            <SelectSearch setOption={setOption} arrOption={arrOption} />
          ) : null}
          {onAdd ? (
            <div>
              <Label color="green">
                <div
                  onClick={(e) => onAdd()}
                  className="flex items-center gap-x-1 cursor-pointer"
                >
                  <span class="material-icons">add</span>
                  Thêm
                </div>
              </Label>
            </div>
          ) : null}
        </div>
        <div className="overflow-x-auto scroll max-h-[700px]">
          <table className="items-center w-full bg-transparent border-collapse">
            <thead>
              <tr>
                {arrTitle.map((value, index) => {
                  return (
                    <th
                      key={index}
                      className="px-2 text-purple-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left"
                    >
                      {value}
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {arrContent && arrContent.length > 0 ? (
                arrContent.map((value, index) => {
                  return (
                    <tr key={index}>
                      <th className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                        {index + 1}
                      </th>
                      {renderObjectElement(value)}
                      {arrActivity
                        ? arrActivity.map((valueOne, indexOne) => {
                            return (
                              <th
                                key={indexOne}
                                onClick={(e) => valueOne.onClick(value)}
                                className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left"
                              >
                                {
                                  <Label color={valueOne.color}>
                                    <div className="flex gap-x-1 items-center cursor-pointer">
                                      <span class="material-icons">
                                        {valueOne.icon}
                                      </span>
                                      {valueOne.title}
                                    </div>
                                  </Label>
                                }
                              </th>
                            );
                          })
                        : null}
                    </tr>
                  );
                })
              ) : (
                <th className="border-b border-gray-200 align-middle font-light text-xl whitespace-nowrap px-2 py-4 text-left">
                  Không có dữ liệu
                </th>
              )}
            </tbody>
          </table>
        </div>
      </CardBody>
    </Card>
  );
}
