import { Checkbox } from "@mui/material";
import styler from "./table.module.css";
import classNames from "classnames";
import React, { Dispatch, SetStateAction, useState } from "react";

export interface ContentTableItemProps {
  id: number | string;
  children?: React.ReactNode;
  edit?: boolean;
  disableCheckbox?: boolean;
  className?: any;
  enable?: boolean;
  setEnabler?: Dispatch<SetStateAction<boolean[]>>;
  backGroundColor?: string;
}

export function ContentTableItem({
  id,
  children,
  edit,
  disableCheckbox,
  className,
  enable,
  setEnabler,
  backGroundColor,
}: ContentTableItemProps) {
  const checkBoxProps = {
    className: styler.checkbox,
    disabled: edit,
    checked: enable,
    onChange: (evnt: React.ChangeEvent<HTMLInputElement>) => {
      if (setEnabler === undefined) return;

      setEnabler((cur) => [
        ...cur.map((value, idx) => (idx === id ? !value : false)),
      ]);
      console.log(enable);
    },
  };

  return (
    <div
      className={classNames({ [styler.TableItem]: true, [className]: true })}
      style={{ backgroundColor: backGroundColor }}
    >
      {disableCheckbox ? (
        <span className={styler.checkbox} />
      ) : (
        <Checkbox {...checkBoxProps} />
      )}
      <span className={styler.division} />
      <span className={styler.id}> {id} </span>
      <span className={styler.division} />
      <span className={styler.content}>{children}</span>
    </div>
  );
}

export interface ContentTableItemDataProps {
  data: any;
  prefabs: React.ReactNode;
}

export interface TableProps {
  Label: React.ReactNode;
  TableElementAppend?: React.ReactNode;
  TableElementModify?: React.ReactNode;
  TableElementDelete?: React.ReactNode;
  data: Array<ContentTableItemDataProps>;
}

export function ContentTable({
  Label,
  TableElementAppend,
  TableElementModify,
  TableElementDelete,
  data,
}: TableProps) {
  const [enables, SetEnables] = useState<Array<boolean>>(
    new Array<boolean>(data.length).fill(false)
  );
  const [isCreate, setIsCreate] = useState<boolean>(false);
  const [isModify, setIsModify] = useState<boolean>(false);
  const [isDelete, setIsDelete] = useState<boolean>(false);

  return (
    <>
      <ul className={styler.Table}>
        <ContentTableItem
          id={"#"}
          className={styler.header}
          disableCheckbox
          backGroundColor={"#eee"}
        >
          {Label}
        </ContentTableItem>
        {enables.map((_, i) => (
          <ContentTableItem
            key={i}
            id={i}
            enable={enables[i]}
            setEnabler={SetEnables}
          >
            {data[i].prefabs}
          </ContentTableItem>
        ))}
        <ContentTableItem
          id={
            enables.filter((value, idx) => value === true).length +
            "/" +
            enables.length
          }
          className={styler.footer}
          disableCheckbox
          backGroundColor={"#eee"}
        >
          <div className={styler.ButtonBox}>
            <button
              onClick={() => {
                SetEnables((cur) => cur.map((_) => false));
              }}
            >
              CLEAR
            </button>
            <button
              disabled={enables.filter((value) => value === true).length !== 0}
              onClick={() => {
                setIsCreate((cur) => true);
              }}
            >
              APPEND
            </button>
            <button
              disabled={enables.filter((value) => value === true).length !== 1}
              onClick={() => {
                setIsModify((cur) => true);
              }}
            >
              MODIFY
            </button>
            <button
              disabled={enables.filter((value) => value === true).length !== 1}
              onClick={() => {
                setIsDelete((cur) => true);
              }}
            >
              REMOVE
            </button>
          </div>
        </ContentTableItem>
      </ul>
      {isCreate ? (
        <ContentTableModifyPane setEnable={setIsCreate}>
          {TableElementAppend}
        </ContentTableModifyPane>
      ) : null}
      {isModify ? (
        <ContentTableModifyPane setEnable={setIsModify}>
          {TableElementModify}
        </ContentTableModifyPane>
      ) : null}
      {isDelete ? (
        <ContentTableModifyPane setEnable={setIsDelete}>
          {TableElementDelete}
        </ContentTableModifyPane>
      ) : null}
    </>
  );
}

export interface ContentTableModifyItemProps {
  children?: React.ReactNode;
  title?: string;
  setEnable: Dispatch<SetStateAction<boolean>>;
}

export function ContentTableModifyPane({
  children,
  title,
  setEnable,
}: ContentTableModifyItemProps) {
  return (
    <div className={styler.CreateItem}>
      <div className={styler.modalView}>
        <div>
          <span> {title} </span>
          <button
            onClick={() => {
              setEnable((cur) => false);
            }}
          >
            Exit
          </button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
}
