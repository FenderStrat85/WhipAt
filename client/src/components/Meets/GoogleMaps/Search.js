//Google places auto complete
import React from "react";
import usePlacesAutocomplete, {
  getGeocode,
  getLatlng,
} from "use-places-autocomplete";

export default function Search {
  const {
    ready,
    value,
    suggestion: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    // requestOptions:{
    // }
  });
  
  return ({
    <div>
    placeholder
    </div>
  })
};
