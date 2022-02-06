import { Route, Router, Routes } from "react-router-dom";
import { createMemoryHistory } from "history";
import { render } from "@testing-library/react";
import { MockedProvider, MockedResponse } from '@apollo/client/testing';



export const customRender = (
  node: JSX.Element | null,
  mocks?: MockedResponse[],
  {
    route = "/",
    history = createMemoryHistory({ initialEntries: [route] })
  } = {}
) => {
  return {
    history,
    ...render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Router location={''} navigator={history}>
          <Routes>
            <Route element={node} />
          </Routes>
        </Router>
      </MockedProvider>
    )
  };
};

