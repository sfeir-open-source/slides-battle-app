import React, { useCallback, useState } from "react";
import {
  Button,
  FormControlLabel,
  FormGroup,
  Switch,
  TextField,
} from "@material-ui/core";
import { useForm } from "react-hook-form";
import { Modal } from "../modal/Modal";

export const useConfigurationForm = (create, update) => {
  const [isLoading, setLoading] = useState(false);
  const [payload, setPayload] = useState(null);

  const onSubmit = useCallback(
    (value) => {
      setLoading(true);

      // Force number for the id
      value.id = +value.id;

      if (value.id) {
        update(value);
      } else {
        create(value);
      }

      setPayload(null);
      setLoading(false);
    },
    [update, create, setLoading]
  );

  const onCancel = useCallback(() => setPayload(null), [setPayload]);

  return {
    isLoading,
    payload,
    setPayload,
    onSubmit,
    onCancel,
  };
};

export const ConfigurationForm = ({ value, onSubmit, onCancel }) => {
  const { register, handleSubmit, errors } = useForm({ mode: "onSubmit" });

  return (
    <Modal zIndex={2} margin="-110px 0 0 -175px">
      <form>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: 10,
            width: 300,
          }}
        >
          <input
            name="id"
            defaultValue={value.id}
            ref={register}
            type="hidden"
          />
          <TextField
            name="name"
            defaultValue={value.name}
            inputRef={register({ required: true })}
            style={{ marginBottom: "25px" }}
            id="name"
            error={!!errors.name}
            helperText={errors.name ? "The name is required" : null}
            label="Name"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <FormGroup row>
            <FormControlLabel
              name="isEnabled"
              label="Enabled"
              labelPlacement="start"
              style={{ marginLeft: 0, marginBottom: "25px" }}
              inputRef={register}
              control={
                <Switch defaultChecked={value.isEnabled} color="primary" />
              }
            />
          </FormGroup>

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Button
              style={{ color: "black" }}
              variant="contained"
              onClick={onCancel}
            >
              Cancel
            </Button>
            <Button
              style={{ color: "white" }}
              variant="contained"
              color="primary"
              onClick={handleSubmit(onSubmit)}
            >
              Confirm
            </Button>
          </div>
        </div>
      </form>
    </Modal>
  );
};
