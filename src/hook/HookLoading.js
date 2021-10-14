import Loading from "components/Loading";
import React, { useState } from "react";

export default function HookLoading() {
  const [loading, setLoading] = useState(false);
  return [
    () => setLoading(false),
    () => setLoading(true),
    loading ? <Loading /> : null,
  ];
}
