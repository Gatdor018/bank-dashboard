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
    return severityClasses[b.riskLevel] - severityClasses[a.riskLevel];
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
        <h2 className="mb-3 text-xl font-semibold text-white">
            Alerts{""}
        <span className="mb-3 text-white"> 
            ({unreviewedCount})
        </span>
        </h2>
        <div className="space-y-2">
            {sortedAlerts.map((alert) => (
                <div key={alert.id} className={`flex items-start justify-between gap-4 rounded-3xl border border-[#164d33] bg-[#0d2f23] p-4 ${alert.reviewed ? 'opacity-60' : ''} shadow-xl shadow-black/20`}>
                    <div>
                        <p className="font-semibold text-white">{alert.alertMessage}</p>
                        <p className="text-sm text-white">{alert.riskLevel} risk · {alert.alertTime}</p>
                    </div>

                    {alert.reviewed ? (
                        <span className="shrink-0 text-xs font-medium text-white">Reviewed</span>
                    ) : ( 
                        <button
                            onClick={() => handleReview(alert.id)}
                            className="rounded-full bg-[#35d794] px-3 py-1.5 text-sm font-semibold text-[#05250f] shadow-lg shadow-[#35d794]/20 hover:bg-[#7ef0c0]"
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
