import React, { useEffect } from "react";
import MaterialTable from "material-table";

export default function AnalysisTable(props) {
  const [state, setState] = React.useState({
    columns: [
      { title: "Place", field: "place" },
      { title: "Weight", field: "weight" },
      { title: "Description", field: "description" },
    ],
    language: props.language,
    analysis: props.data,
    score: props.score,
  });

  useEffect(() => {
    setState((state) => ({
      ...state,
      analysis: props.data,
      language: props.language,
      score: props.score,
    }));
  }, [props.data, props.language, props.score]);

  return (
    <MaterialTable
      title={"Evaluated Language: " + state.language + " (" + state.score + ")"}
      columns={state.columns}
      data={state.analysis}
      editable={{}}
    />
  );
}
