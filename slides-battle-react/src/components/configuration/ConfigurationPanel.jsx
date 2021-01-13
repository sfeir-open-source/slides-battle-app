import React from "react";
import {
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Typography,
} from "@material-ui/core";
import { Add, Edit, DeleteForever } from "@material-ui/icons";
import { ConfigurationForm, useConfigurationForm } from "./ConfigurationForm";
import { Loader } from "../layout";
import { ConfigurationHeader } from "./ConfigurationHeader";

export const ConfigurationPanel = ({ header, values, remove, update, add }) => {
  const {
    isLoading,
    payload,
    setPayload,
    onSubmit,
    onCancel,
  } = useConfigurationForm(add, update);

  return (
    <div style={{ display: "flex", flex: 1, flexDirection: "column" }}>
      <ConfigurationHeader backgroundColor="#654f30">
        <Typography
          style={{ flex: "1 1 100%" }}
          variant="h6"
          color="secondary"
          component="div"
        >
          {header}
        </Typography>

        <IconButton
          color="secondary"
          aria-label="add"
          onClick={() => setPayload({ name: "" })}
        >
          <Add />
        </IconButton>
      </ConfigurationHeader>
      <List style={{ backgroundColor: "white", padding: 0 }}>
        {values.map((value) => (
          <React.Fragment key={value.id}>
            <ListItem
              style={{
                backgroundColor: value.isEnabled ? "white" : "lightgray",
                color: value.isEnabled ? "black" : "gray",
              }}
            >
              <ListItemText primary={value.name} />
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
