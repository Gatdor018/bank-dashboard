"use client";
import { useState } from "react";
import type { Alert, RiskLevel } from "../types/types";

// Shape for the AlertsCard component, which includes an array of alerts.
interface AlertsCardProps {
  alerts: Alert[];
}
// Lookup table for severity classes based on risk level
const severityClasses: Record<RiskLevel, number> = {
  high: 3,
  medium: 2,
  low: 1,
};

export default function AlertsCard({ alerts }: AlertsCardProps) {
    // copy the incoming alerts to a state variable so we can update it when an alert is marked as reviewed
  const [alertList, setAlertList] = useState<Alert[]>(alerts);

  const sortedAlerts = [...alertList].sort((a, b) => {
    // Sort by reviewed status first, then by risk level
    if (a.reviewed !== b.reviewed) {
      return a.reviewed ? 1 : -1;
    }
    else
    {
    return severityClasses[a.riskLevel] - severityClasses[b.riskLevel];
    }
  });
  // Function to handle marking an alert as reviewed
  const handleReview = (id: string) => {
    setAlertList((currentAlert) =>
      currentAlert.map((alert) =>
        alert.id === id ? { ...alert, reviewed: true } : alert
      )
    );
  };
  // Count the number of unreviewed alerts
  const unreviewedCount = alertList.filter((alert) => !alert.reviewed).length;
  
  return (
    <section className="mt-8">
        <h2 className="mb-3 text-xl font-semibold text-zinc-900">
            Alerts{""}
        <span className="mb-3 text-zinc-600"> 
            ({unreviewedCount} unreviewed)
        </span>
        </h2>
        <div className="space-y-2">
            {sortedAlerts.map((alert) => (
                <div key={alert.id} className={`flex items-start justify-between gap-4 rounded-lg border border-zinc-200 bg-white p-3 ${severityClasses[alert.riskLevel]} ${alert.reviewed ? 'opacity-60' : ''} shadow-sm`}>
                    <div>
                        <p className="font-semibold text-zinc-900">{alert.alertMessage}</p>
                        <p className="text-sm text-zinc-600"> {alert.riskLevel} risk : {alert.alertTime} </p>
                    </div>

                    {alert.reviewed ? (
                        <span className="shrink-0 text-xs font-medium text-zinc-400">Reviewed</span>
                    ) : ( 
                        <button
                            onClick={() => handleReview(alert.id)}
                            className="rounded bg-blue-500 px-3 py-1 text-white hover:bg-blue-600"
                        >
                            Mark as Reviewed
                        </button>
                    )}
                </div>
            ))}
        </div>
    </section>
  );
}
