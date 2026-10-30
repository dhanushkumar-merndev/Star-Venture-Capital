/**
 * Founder Enquiry Form Controller
 *
 * Implements accessible client-side validation, error handling,
 * character counting, and a clean configurable submission lifecycle.
 */

export function initEnquiryForm(enquiryConfig) {
  const form = document.getElementById("founderEnquiryForm");
  const successState = document.getElementById("enquirySuccessState");
  const submitBtn = document.getElementById("enquirySubmitBtn");
  const resetBtn = document.getElementById("enquiryResetBtn");
  const charCounter = document.getElementById("charCountDisplay");
  const pitchTextarea = document.getElementById("pitchSummary");
  const previewBox = document.getElementById("submissionSummaryPreview");

  if (!form) return;

  // Real-time character counter
  if (pitchTextarea && charCounter) {
    pitchTextarea.addEventListener("input", () => {
      const current = pitchTextarea.value.length;
      charCounter.textContent = `${current} / 800 characters`;
    });
  }

  // Field validator helper
  function validateField(inputEl) {
    const parentGroup = inputEl.closest(".form-group");
    const errorEl = parentGroup ? parentGroup.querySelector(".form-error-msg") : null;
    let isValid = true;
    let errorMessage = "";

    const val = inputEl.value.trim();

    if (inputEl.hasAttribute("required") && !val) {
      isValid = false;
      errorMessage = "This field is required.";
    } else if (inputEl.type === "email" && val) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(val)) {
        isValid = false;
        errorMessage = "Please enter a valid work email address.";
      }
    } else if (inputEl.id === "sector" && (val === "" || val.startsWith("Select"))) {
      isValid = false;
      errorMessage = "Please select your primary industry sector.";
    } else if (inputEl.id === "stage" && (val === "" || val.startsWith("Select"))) {
      isValid = false;
      errorMessage = "Please select your current funding stage.";
    } else if (inputEl.id === "pitchSummary" && val.length < 20) {
      isValid = false;
      errorMessage = "Please provide at least 20 characters describing your venture.";
    }

    if (parentGroup) {
      if (!isValid) {
        parentGroup.classList.add("has-error");
        if (errorEl) errorEl.textContent = errorMessage;
        inputEl.setAttribute("aria-invalid", "true");
      } else {
        parentGroup.classList.remove("has-error");
        inputEl.removeAttribute("aria-invalid");
      }
    }

    return isValid;
  }

  // Live validation on blur
  const formInputs = form.querySelectorAll("input, select, textarea");
  formInputs.forEach((input) => {
    input.addEventListener("blur", () => {
      if (input.value.trim() !== "") {
        validateField(input);
      }
    });

    input.addEventListener("input", () => {
      const group = input.closest(".form-group");
      if (group && group.classList.contains("has-error")) {
        validateField(input);
      }
    });
  });

  // Handle Form Submission
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    let allValid = true;
    let firstInvalid = null;

    formInputs.forEach((input) => {
      if (!validateField(input)) {
        allValid = false;
        if (!firstInvalid) firstInvalid = input;
      }
    });

    if (!allValid) {
      if (firstInvalid) firstInvalid.focus();
      return;
    }

    // Submit state UX
    submitBtn.disabled = true;
    const originalBtnText = submitBtn.innerHTML;
    submitBtn.innerHTML = `
      <svg class="animate-spin" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle>
        <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor"></path>
      </svg>
      Submitting Enquiry...
    `;

    const formData = {
      founderName: form.founderName.value.trim(),
      companyName: form.companyName.value.trim(),
      email: form.email.value.trim(),
      website: form.website ? form.website.value.trim() : "",
      sector: form.sector.value,
      stage: form.stage.value,
      pitchSummary: form.pitchSummary.value.trim(),
      deckUrl: form.deckUrl ? form.deckUrl.value.trim() : "",
      submittedAt: new Date().toISOString(),
      referenceId: "SVC-" + Math.random().toString(36).substring(2, 8).toUpperCase(),
    };

    console.log("[Star Venture Capital] Enquiry Form Submitted:", formData);
    console.info(`Target integration endpoint configured at: ${enquiryConfig.submissionConfig.endpoint}`);

    // Simulate network latency
    await new Promise((resolve) => setTimeout(resolve, enquiryConfig.submissionConfig.mockSuccessTimeMs || 1000));

    // Show success view
    form.style.display = "none";
    if (successState) {
      successState.style.display = "block";
      if (previewBox) {
        previewBox.innerHTML = `
          <strong>Reference ID:</strong> ${formData.referenceId}<br/>
          <strong>Company:</strong> ${formData.companyName} (${formData.founderName})<br/>
          <strong>Sector & Stage:</strong> ${formData.sector} · ${formData.stage}<br/>
          <strong>Contact:</strong> ${formData.email}
        `;
      }
      successState.scrollIntoView({ behavior: "smooth", block: "center" });
    }

    submitBtn.disabled = false;
    submitBtn.innerHTML = originalBtnText;
  });

  // Reset form handler
  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      form.reset();
      formInputs.forEach((input) => {
        const group = input.closest(".form-group");
        if (group) group.classList.remove("has-error");
        input.removeAttribute("aria-invalid");
      });
      if (charCounter) charCounter.textContent = "0 / 800 characters";
      successState.style.display = "none";
      form.style.display = "block";
      form.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }
}
