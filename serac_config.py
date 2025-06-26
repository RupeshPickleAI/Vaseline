import json
import sys
import os

def save_ocr_config(config):
    # Save to serac_configpath
    config_path = "C:/Users/Rupesh/demoprojects/Vaseline/assets/allconfigs/serac1_config.json"
    with open(config_path, 'w') as file:
        json.dump(config, file, indent=4)
    print(f"Serac Configurationsaved to {config_path}")

def update_ocr_config(sku):
    sku = int(sku)  # Ensure SKU is integer 

    serac_config = {
        1: {  # Comfort Blue Morning Fresh 210ml
            "Back_Camera": {
                "Back_Camera_Config_Path": "C:/Users/pc/Desktop/Indus-vision-Code-base/Camera_Config/Back_Camera_updated.Config",
                "Back_Camera_Model_Weights": "C:/Users/pc/Desktop/Indus-vision-Code-base/Model_Weights/Back_Camera_Weights.pt",
                "Back_Camera_Serial_Number": "054092523090",
                "Back_Camera_Incount_Tag": "DENT_BOTTLE_TRIGGER_1",
                "Back_Camera_Rejection_Tag": "CAMERA_TRIGGER_3",
                "Back_Camera_Output_Dir": "C:/Users/pc/Desktop/Indus-vision-Code-base/Defect_Images_Folder/Back_Camera_Defects"
            },
            "CLD_camera": {
                "CLD_Camera_Config_Path": "",
                "CLD_Camera_Model_Weights": "C:/Users/pc/Desktop/Indus-vision-Code-base/Model_Weights/CLD_Camera_Weights.pt",
                "CLD_Camera_Serial_Number": "054003520048",
                "CLD_Camera_Incount_Tag": "",
                "CLD_Camera_Rejection_Tag": "",
                "CLD_Camera_Output_Dir": ""
            },
            "OCR_Camera": {
                "OCR_Camera_Config_Path": "dheouahdhowuadhowhhowofc",
                "OCR_Camera_Model_Weights": "deohdewdohdo",
                "OCR_Camera_Serial_Number": "fhffwuboooobu",
                "OCR_Camera_Incount_Tag": "ouou8ghiugvi,uyyv",
                "OCR_Camera_Rejection_Tag": "ohdqbuebudebbd",
                "OCR_Camera_Output_Dir": "bbbjbj",
                "OCR_Camera_Default_Conf": "bihhbbh",
                "OCR_Camera_Iou_Thresh": "deed",
                "OCR_Camera_Ocr_Count": "ededede"
            },
            "Front_Camera": {
                "Front_Camera_Config_Path": "dcfvgjbh",
                "Front_Camera_Model_Weights": "asdfghjk",
                "Front_Camera_Serial_Number": "lkjhgfd",
                "Front_Camera_Incount_Tag": "rtyui",
                "Front_Camera_Rejection_Tag": "mnbvcx",
                "Front_Camera_Output_Dir": "hgyfcvbhuygfcvb"
            },
            "Sleeve_Camera": {
                "Sleeve_Camera_Config_Path": "sdfghj",
                "Sleeve_Camera_Model_Weights": "xdcvbn",
                "Sleeve_Camera_Serial_Number": "cvbn",
                "Sleeve_Camera_Incount_Tag": "sdcfvgbhn",
                "Sleeve_Camera_Rejection_Tag": "sdfvgbhn",
                "Sleeve_Camera_Output_Dir": ""
            },
            "back_camera_image_write_path": "C:/Users/pc/Desktop/Indus-vision-Code-base/Serac1_Config/b64_image_feed.json",
            "dashboard_url": "http://localhost:8000/api/dashboard/",
            "machine_id": 5,
            "department": 2,
            "dashboard_urll": "http://localhost:8000/api/dashboard/",
            "machine_idd": 5,
            "departmentt": 2
        },
        2: {  # Comfort Pink Lily Fresh 210ml
            "Back_Camera": {
                "Back_Camera_Config_Path": "C:/Users/pc/Desktop/Indus-vision-Code-base/Camera_Config/Back_Camera_updated.Config",
                "Back_Camera_Model_Weights": "C:/Users/pc/Desktop/Indus-vision-Code-base/Model_Weights/Back_Camera_Weights.pt",
                "Back_Camera_Serial_Number": "054092523090",
                "Back_Camera_Incount_Tag": "DENT_BOTTLE_TRIGGER_1",
                "Back_Camera_Rejection_Tag": "CAMERA_TRIGGER_3",
                "Back_Camera_Output_Dir": "C:/Users/pc/Desktop/Indus-vision-Code-base/Defect_Images_Folder/Back_Camera_Defects"
            },
            "CLD_camera": {
                "CLD_Camera_Config_Path": "",
                "CLD_Camera_Model_Weights": "C:/Users/pc/Desktop/Indus-vision-Code-base/Model_Weights/CLD_Camera_Weights.pt",
                "CLD_Camera_Serial_Number": "054003520048",
                "CLD_Camera_Incount_Tag": "",
                "CLD_Camera_Rejection_Tag": "",
                "CLD_Camera_Output_Dir": ""
            },
            "OCR_Camera": {
                "OCR_Camera_Config_Path": "dheouahdhowuadhowhhowofc",
                "OCR_Camera_Model_Weights": "deohdewdohdo",
                "OCR_Camera_Serial_Number": "fhffwuboooobu",
                "OCR_Camera_Incount_Tag": "ouou8ghiugvi,uyyv",
                "OCR_Camera_Rejection_Tag": "ohdqbuebudebbd",
                "OCR_Camera_Output_Dir": "bbbjbj",
                "OCR_Camera_Default_Conf": "bihhbbh",
                "OCR_Camera_Iou_Thresh": "deed",
                "OCR_Camera_Ocr_Count": "ededede"
            },
            "Front_Camera": {
                "Front_Camera_Config_Path": "dcfvgjbh",
                "Front_Camera_Model_Weights": "asdfghjk",
                "Front_Camera_Serial_Number": "lkjhgfd",
                "Front_Camera_Incount_Tag": "rtyui",
                "Front_Camera_Rejection_Tag": "mnbvcx",
                "Front_Camera_Output_Dir": "hgyfcvbhuygfcvb"
            },
            "Sleeve_Camera": {
                "Sleeve_Camera_Config_Path": "sdfghj",
                "Sleeve_Camera_Model_Weights": "xdcvbn",
                "Sleeve_Camera_Serial_Number": "cvbn",
                "Sleeve_Camera_Incount_Tag": "sdcfvgbhn",
                "Sleeve_Camera_Rejection_Tag": "sdfvgbhn",
                "Sleeve_Camera_Output_Dir": ""
            },
            "back_camera_image_write_path": "C:/Users/pc/Desktop/Indus-vision-Code-base/Serac1_Config/b64_image_feed.json",
            "dashboard_url": "http://localhost:8000/api/dashboard/",
            "machine_id": 5,
            "department": 2,
            "dashboard_urll": "http://localhost:8000/api/dashboard/",
            "machine_idd": 5,
            "departmentt": 2
        },
        3: {  # Comfort Black Desire and Royale 210ml
            "Back_Camera": {
                "Back_Camera_Config_Path": "C:/Users/pc/Desktop/Indus-vision-Code-base/Camera_Config/Back_Camera_updated.Config",
                "Back_Camera_Model_Weights": "C:/Users/pc/Desktop/Indus-vision-Code-base/Model_Weights/Back_Camera_Weights.pt",
                "Back_Camera_Serial_Number": "054092523090",
                "Back_Camera_Incount_Tag": "DENT_BOTTLE_TRIGGER_1",
                "Back_Camera_Rejection_Tag": "CAMERA_TRIGGER_3",
                "Back_Camera_Output_Dir": "C:/Users/pc/Desktop/Indus-vision-Code-base/Defect_Images_Folder/Back_Camera_Defects"
            },
            "CLD_camera": {
                "CLD_Camera_Config_Path": "",
                "CLD_Camera_Model_Weights": "C:/Users/pc/Desktop/Indus-vision-Code-base/Model_Weights/CLD_Camera_Weights.pt",
                "CLD_Camera_Serial_Number": "054003520048",
                "CLD_Camera_Incount_Tag": "",
                "CLD_Camera_Rejection_Tag": "",
                "CLD_Camera_Output_Dir": ""
            },
            "OCR_Camera": {
                "OCR_Camera_Config_Path": "dheouahdhowuadhowhhowofc",
                "OCR_Camera_Model_Weights": "deohdewdohdo",
                "OCR_Camera_Serial_Number": "fhffwuboooobu",
                "OCR_Camera_Incount_Tag": "ouou8ghiugvi,uyyv",
                "OCR_Camera_Rejection_Tag": "ohdqbuebudebbd",
                "OCR_Camera_Output_Dir": "bbbjbj",
                "OCR_Camera_Default_Conf": "bihhbbh",
                "OCR_Camera_Iou_Thresh": "deed",
                "OCR_Camera_Ocr_Count": "ededede"
            },
            "Front_Camera": {
                "Front_Camera_Config_Path": "dcfvgjbh",
                "Front_Camera_Model_Weights": "asdfghjk",
                "Front_Camera_Serial_Number": "lkjhgfd",
                "Front_Camera_Incount_Tag": "rtyui",
                "Front_Camera_Rejection_Tag": "mnbvcx",
                "Front_Camera_Output_Dir": "hgyfcvbhuygfcvb"
            },
            "Sleeve_Camera": {
                "Sleeve_Camera_Config_Path": "sdfghj",
                "Sleeve_Camera_Model_Weights": "xdcvbn",
                "Sleeve_Camera_Serial_Number": "cvbn",
                "Sleeve_Camera_Incount_Tag": "sdcfvgbhn",
                "Sleeve_Camera_Rejection_Tag": "sdfvgbhn",
                "Sleeve_Camera_Output_Dir": ""
            },
            "back_camera_image_write_path": "C:/Users/pc/Desktop/Indus-vision-Code-base/Serac1_Config/b64_image_feed.json",
            "dashboard_url": "http://localhost:8000/api/dashboard/",
            "machine_id": 5,
            "department": 2,
            "dashboard_urll": "http://localhost:8000/api/dashboard/",
            "machine_idd": 5,
            "departmentt": 2
        },
        4: {  # Comfort Green Garden Fresh 210ml
            "Back_Camera": {
                "Back_Camera_Config_Path": "C:/Users/pc/Desktop/Indus-vision-Code-base/Camera_Config/Back_Camera_updated.Config",
                "Back_Camera_Model_Weights": "C:/Users/pc/Desktop/Indus-vision-Code-base/Model_Weights/Back_Camera_Weights.pt",
                "Back_Camera_Serial_Number": "054092523090",
                "Back_Camera_Incount_Tag": "DENT_BOTTLE_TRIGGER_1",
                "Back_Camera_Rejection_Tag": "CAMERA_TRIGGER_3",
                "Back_Camera_Output_Dir": "C:/Users/pc/Desktop/Indus-vision-Code-base/Defect_Images_Folder/Back_Camera_Defects"
            },
            "CLD_camera": {
                "CLD_Camera_Config_Path": "",
                "CLD_Camera_Model_Weights": "C:/Users/pc/Desktop/Indus-vision-Code-base/Model_Weights/CLD_Camera_Weights.pt",
                "CLD_Camera_Serial_Number": "054003520048",
                "CLD_Camera_Incount_Tag": "",
                "CLD_Camera_Rejection_Tag": "",
                "CLD_Camera_Output_Dir": ""
            },
            "OCR_Camera": {
                "OCR_Camera_Config_Path": "dheouahdhowuadhowhhowofc",
                "OCR_Camera_Model_Weights": "deohdewdohdo",
                "OCR_Camera_Serial_Number": "fhffwuboooobu",
                "OCR_Camera_Incount_Tag": "ouou8ghiugvi,uyyv",
                "OCR_Camera_Rejection_Tag": "ohdqbuebudebbd",
                "OCR_Camera_Output_Dir": "bbbjbj",
                "OCR_Camera_Default_Conf": "bihhbbh",
                "OCR_Camera_Iou_Thresh": "deed",
                "OCR_Camera_Ocr_Count": "ededede"
            },
            "Front_Camera": {
                "Front_Camera_Config_Path": "dcfvgjbh",
                "Front_Camera_Model_Weights": "asdfghjk",
                "Front_Camera_Serial_Number": "lkjhgfd",
                "Front_Camera_Incount_Tag": "rtyui",
                "Front_Camera_Rejection_Tag": "mnbvcx",
                "Front_Camera_Output_Dir": "hgyfcvbhuygfcvb"
            },
            "Sleeve_Camera": {
                "Sleeve_Camera_Config_Path": "sdfghj",
                "Sleeve_Camera_Model_Weights": "xdcvbn",
                "Sleeve_Camera_Serial_Number": "cvbn",
                "Sleeve_Camera_Incount_Tag": "sdcfvgbhn",
                "Sleeve_Camera_Rejection_Tag": "sdfvgbhn",
                "Sleeve_Camera_Output_Dir": ""
            },
            "back_camera_image_write_path": "C:/Users/pc/Desktop/Indus-vision-Code-base/Serac1_Config/b64_image_feed.json",
            "dashboard_url": "http://localhost:8000/api/dashboard/",
            "machine_id": 5,
            "department": 2,
            "dashboard_urll": "http://localhost:8000/api/dashboard/",
            "machine_idd": 5,
            "departmentt": 2
        },
        5: {  # Comfort Blue Morning Fresh 430ml
            "Back_Camera": {
                "Back_Camera_Config_Path": "C:/Users/pc/Desktop/Indus-vision-Code-base/Camera_Config/Back_Camera_updated.Config",
                "Back_Camera_Model_Weights": "C:/Users/pc/Desktop/Indus-vision-Code-base/Model_Weights/Back_Camera_Weights.pt",
                "Back_Camera_Serial_Number": "054092523090",
                "Back_Camera_Incount_Tag": "DENT_BOTTLE_TRIGGER_1",
                "Back_Camera_Rejection_Tag": "CAMERA_TRIGGER_3",
                "Back_Camera_Output_Dir": "C:/Users/pc/Desktop/Indus-vision-Code-base/Defect_Images_Folder/Back_Camera_Defects"
            },
            "CLD_camera": {
                "CLD_Camera_Config_Path": "",
                "CLD_Camera_Model_Weights": "C:/Users/pc/Desktop/Indus-vision-Code-base/Model_Weights/CLD_Camera_Weights.pt",
                "CLD_Camera_Serial_Number": "054003520048",
                "CLD_Camera_Incount_Tag": "",
                "CLD_Camera_Rejection_Tag": "",
                "CLD_Camera_Output_Dir": ""
            },
            "OCR_Camera": {
                "OCR_Camera_Config_Path": "dheouahdhowuadhowhhowofc",
                "OCR_Camera_Model_Weights": "deohdewdohdo",
                "OCR_Camera_Serial_Number": "fhffwuboooobu",
                "OCR_Camera_Incount_Tag": "ouou8ghiugvi,uyyv",
                "OCR_Camera_Rejection_Tag": "ohdqbuebudebbd",
                "OCR_Camera_Output_Dir": "bbbjbj",
                "OCR_Camera_Default_Conf": "bihhbbh",
                "OCR_Camera_Iou_Thresh": "deed",
                "OCR_Camera_Ocr_Count": "ededede"
            },
            "Front_Camera": {
                "Front_Camera_Config_Path": "dcfvgjbh",
                "Front_Camera_Model_Weights": "asdfghjk",
                "Front_Camera_Serial_Number": "lkjhgfd",
                "Front_Camera_Incount_Tag": "rtyui",
                "Front_Camera_Rejection_Tag": "mnbvcx",
                "Front_Camera_Output_Dir": "hgyfcvbhuygfcvb"
            },
            "Sleeve_Camera": {
                "Sleeve_Camera_Config_Path": "sdfghj",
                "Sleeve_Camera_Model_Weights": "xdcvbn",
                "Sleeve_Camera_Serial_Number": "cvbn",
                "Sleeve_Camera_Incount_Tag": "sdcfvgbhn",
                "Sleeve_Camera_Rejection_Tag": "sdfvgbhn",
                "Sleeve_Camera_Output_Dir": ""
            },
            "back_camera_image_write_path": "C:/Users/pc/Desktop/Indus-vision-Code-base/Serac1_Config/b64_image_feed.json",
            "dashboard_url": "http://localhost:8000/api/dashboard/",
            "machine_id": 5,
            "department": 2,
            "dashboard_urll": "http://localhost:8000/api/dashboard/",
            "machine_idd": 5,
            "departmentt": 2
        }
    }

    if sku in serac_config:
        save_ocr_config(serac_config[sku])
        print(f"Serac config updatedfor SKU {sku}")
        return True
    else:
        print(f"No Serac Configurationdefined for SKU {sku}")
        return False

if __name__ == "__main__":
    if len(sys.argv) > 1:
        try:
            sku_number = int(sys.argv[1])
            update_ocr_config(sku_number)
        except ValueError:
            print("Invalid SKU number. Please provide a valid integer.")
    else:
        print("Please provide an SKU number as an argument.")