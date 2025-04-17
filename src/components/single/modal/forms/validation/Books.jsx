import { style } from "@/app/data";

export function Title(input) {
  const value = input;
  if (value === null || value === "") {
    return {
      status: false,
      style: style.input.error,
      text_style: style.label.error,
      message: "Must not be Empty",
    };
  }

  return {
    status: true,
    style: style.input.success,
    text_style: style.label.success,
    message: null,
  };
}

export function Password(input) {
  const value = input;
  if (value === null || value === "") {
    return {
      status: false,
      style: style.input.error,
      text_style: style.label.error,
      message: "Must not be Empty",
    };
  }

  const length = value.toString().length;
  if (length < 8 && length > 255) {
    return {
      status: false,
      style: style.input.error,
      text_style: style.label.error,
      message: "should only contain 8 to 255 characters",
    };
  }

  return {
    status: true,
    style: style.input.success,
    text_style: style.label.success,
    message: null,
  };
}

export function Code(input, reference) {
  const value = input;
  const constant = reference;
  if (value === null || (value === "" && value === constant)) {
    return {
      status: false,
      style: style.input.error,
      text_style: style.label.error,
      message: "Must not be Empty",
    };
  }

  return {
    status: true,
    style: style.input.success,
    text_style: style.label.success,
    message: null,
  };
}
