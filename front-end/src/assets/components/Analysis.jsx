import React, { useState, useEffect } from "react";
import "../styles/analysis.css";
function Analysis({handleSearch, searchQuery, setSearchQuery, trackId, audioAnalysis}) {

  return (
    <>
      <div>Analysis</div>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={searchQuery}
          onChange={event => setSearchQuery(event.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      {trackId && <div>Selected Track Id: {trackId}</div>}
      {audioAnalysis && <div>Audio Analysis: {JSON.stringify(audioAnalysis)}</div>}
      
    </>
  );
}
export default Analysis;
