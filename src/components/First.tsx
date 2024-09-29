import {getRealEstateData} from "~/services/service";

export default function First() {
  let res = getRealEstateData();

  return (
    <>
      <div>{res}</div>
    </>
  );
}
