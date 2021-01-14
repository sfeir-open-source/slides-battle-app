import React from "react";
import {
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
} from "@material-ui/core";
import { Add, Edit, DeleteForever } from "@material-ui/icons";
import { ConfigurationForm, useConfigurationForm } from "./ConfigurationForm";
import { Loader } from "../layout/Page";
import { Header } from "../layout/Header";

const PanelHeader = ({ header, setPayload }) => (
  <Header
    backgroundColor="#654f30"
    header={header}
    right={
      <IconButton
        color="secondary"
        aria-label="add"
        onClick={() => setPayload({ name: "", isEnabled: true })}
      >
        <Add />
      </IconButton>
    }
  />
);

export const ConfigurationPanel = ({ header, values, remove, update, add }) => {
  const {
    isLoading,
    payload,
    setPayload,
    onSubmit,
    onCancel,
  } = useConfigurationForm(add, update);

  return (
    <div
      style={{
        display: "flex",
        flex: 1,
        flexDirection: "column",
      }}
    >
      <PanelHeader header={header} setPayload={setPayload} />
      <List
        style={{
          backgroundColor: "white",
          padding: 0,
          height: 300,
          maxHeight: 300,
          overflowY: "scroll",
        }}
      >
        {values.map((value) => (
          <React.Fragment key={value.id}>
            <ListItem
              style={{
                backgroundColor: value.isEnabled ? "white" : "lightgray",
                color: value.isEnabled ? "black" : "gray",
              }}
            >
              <ListItemText primary={value.name} />

              {!value.isLocked && (
                <ListItemSecondaryAction>
                  <IconButton
                    edge="end"
                    color="primary"
                    aria-label="edit"
                    onClick={() => setPayload(value)}
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    edge="end"
                    color="primary"
                    aria-label="delete"
                    onClick={() => remove(value)}
                  >
                    <DeleteForever />
                  </IconButton>
                </ListItemSecondaryAction>
              )}
            </ListItem>
            <Divider />
          </React.Fragment>
        ))}
      </List>
      {payload && (
        <ConfigurationForm
          value={payload}
          onSubmit={onSubmit}
          onCancel={onCancel}
        />
      )}
      <Loader isLoading={isLoading} />
    </div>
  );
};
