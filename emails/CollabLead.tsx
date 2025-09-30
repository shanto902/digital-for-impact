import * as React from "react";

type Props = {
  name: string;
  email: string;
  message: string;
  company?: string;
  role?: string;
  projectType?: string;
  budget?: string;
};

export default function CollabLead(props: Props) {
  const Row = ({ label, value }: { label: string; value?: string }) =>
    value ? (
      <tr>
        <td
          style={{
            padding: "10px 12px",
            fontSize: 13,
            width: 160,
            background: "#F8FFF0",
            borderBottom: "1px solid #eef3e6",
            color: "#111827",
          }}
        >
          <strong>{label}</strong>
        </td>
        <td
          style={{
            padding: "10px 12px",
            fontSize: 13,
            color: "#111827",
            borderBottom: "1px solid #f0f2f5",
          }}
        >
          {value}
        </td>
      </tr>
    ) : null;

  return (
    <div
      style={{
        fontFamily: "Inter, Arial, sans-serif",
        background: "#f9fafb",
        padding: 24,
      }}
    >
      <table
        width="100%"
        role="presentation"
        style={{ maxWidth: 640, margin: "0 auto" }}
      >
        <tbody>
          <tr>
            <td style={{ textAlign: "center", padding: "8px 0 20px" }}>
              <div
                style={{
                  display: "inline-block",
                  padding: "6px 12px",
                  borderRadius: 999,
                  border: "1px solid #dfe7d1",
                  background: "#F8FFF0",
                  color: "#111827",
                  fontSize: 12,
                }}
              >
                New Collaboration Lead
              </div>
              <h1
                style={{
                  margin: "14px 0 0",
                  fontSize: 22,
                  lineHeight: "28px",
                  color: "#0b0f19",
                }}
              >
                {props.name} just submitted the form
              </h1>
              <p style={{ margin: 8, color: "#6b7280", fontSize: 13 }}>
                Reply directly to <strong>{props.email}</strong>
              </p>
            </td>
          </tr>

          <tr>
            <td>
              <table
                width="100%"
                role="presentation"
                style={{
                  background: "#ffffff",
                  border: "1px solid #e5e7eb",
                  borderRadius: 14,
                  overflow: "hidden",
                }}
              >
                <tbody>
                  <Row label="Name" value={props.name} />
                  <Row label="Email" value={props.email} />
                  <Row label="Company" value={props.company} />
                  <Row label="Role" value={props.role} />
                  <Row label="Project Type" value={props.projectType} />
                  <Row label="Budget" value={props.budget} />
                  <tr>
                    <td
                      colSpan={2}
                      style={{
                        padding: 16,
                        background:
                          "linear-gradient(0deg, #ffffff 0%, #ffffff 60%, #f8fff0 100%)",
                      }}
                    >
                      <div
                        style={{
                          padding: 14,
                          border: "1px dashed #c0ff72",
                          borderRadius: 12,
                          background: "#fbfff5",
                        }}
                      >
                        <div
                          style={{
                            fontSize: 12,
                            fontWeight: 600,
                            color: "#064e3b",
                            marginBottom: 6,
                            letterSpacing: 0.3,
                            textTransform: "uppercase",
                          }}
                        >
                          Message
                        </div>
                        <div
                          style={{
                            fontSize: 14,
                            color: "#0b0f19",
                            whiteSpace: "pre-wrap",
                            lineHeight: "22px",
                          }}
                        >
                          {props.message}
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>

              <p
                style={{
                  margin: "12px 4px 0",
                  fontSize: 12,
                  color: "#6b7280",
                  textAlign: "center",
                }}
              >
                Digital For Impact • collaboration form
              </p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
