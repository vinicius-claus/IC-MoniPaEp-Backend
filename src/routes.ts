import { Router } from "express";
import { DiseaseController, HealthProtocolController, USMController, VaccineController } from "./controllers";
import { AppointmentController } from "./controllers/AppointmentController";
import { FAQController } from "./controllers/FAQController";
import { PatientController } from "./controllers/PatientController";

const router = Router()

const patientController = new PatientController();
const faqController = new FAQController()
const appointmentController = new AppointmentController()
const usmController = new USMController()
const vaccineController = new VaccineController()
const diseaseController = new DiseaseController()
const healthProtocolController = new HealthProtocolController()

//Patient routes
router.post("/patients", patientController.create)
router.get("/patients", patientController.list)
router.get("/patients/:patient_id", patientController.getOne)
router.put("/patients/:patient_id", patientController.alterOne)
router.delete("/patients/:patient_id", patientController.deleteOne)

//USM routes
router.get("/usm", usmController.list)
router.get("/usm/:usm_name", usmController.getOne)
router.put("/usm/:usm_name", usmController.alterOne)
router.delete("/usm/:usm_name", usmController.deleteOne)

//Disease routes
router.post("/disease", diseaseController.create)
router.get("/disease", diseaseController.list)


router.post("/faq", faqController.create)
router.post("/appointments", appointmentController.create)

router.post("/vaccine", vaccineController.create)

router.post("/healthprotocol", healthProtocolController.create)





//
export { router };
