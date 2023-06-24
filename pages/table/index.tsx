import { ContentTable, ContentTableItemDataProps } from "./table";

export default function page() {
  return (
    <>
      <div style={{ width: "100vw", height: "100vh" }}>
        <ContentTable
          Label={<>dasd</>}
          data={[
            { data: false, prefabs: <div>dasd</div> },
            { data: false, prefabs: <div>dasd</div> },
            { data: false, prefabs: <div>dasd</div> },
            { data: false, prefabs: <div>dasd</div> },
            { data: false, prefabs: <div>dasd</div> },
          ]}
        />
      </div>
    </>
  );
}
