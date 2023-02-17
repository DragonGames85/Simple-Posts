import { classNames } from "shared/lib/classNames/classNames";
import { Button } from "shared/ui/Button/Button";
import { render, screen } from '@testing-library/react'
import React from "react";

describe("classNames", () => {
  test("with additional class", () => {
    render(<Button> HOLA </Button>);    
    expect(screen.getByText('HOLA')).toBeInTheDocument();
  });

});