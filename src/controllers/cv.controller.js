import ApiResponse from "../utility/ApiResponse.js";
import ApiError from "../utility/ApiError.js";
import requestHandler from "../utility/requestHandeller.js";

export const getCV = requestHandler(async (req, res) => {
  const cvUrl = "https://abhradeep.com/Abhradeep_Biswas_cv.pdf";
  const response = await fetch(cvUrl);
  if (!response.ok) {
    throw new ApiError(502, "Failed to fetch CV from remote server.");
  }
  const contentType = response.headers.get("content-type") || "";
  if (!contentType.includes("application/pdf")) {
    throw new ApiError(502, "Remote server did not return a valid PDF file.");
  }
  const cvBuffer = await response.arrayBuffer();
  const buffer = Buffer.from(cvBuffer);
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader(
    "Content-Disposition",
    'attachment; filename="Abhradeep_Biswas_CV.pdf"'
  );
  res.setHeader("Content-Length", buffer.length);
  res.send(buffer);
});
