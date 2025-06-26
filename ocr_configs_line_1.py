import json
import sys
import os

def save_ocr_config(config):
    # Save to ocr_config.json in the specified folder
    config_path = "C:/Users/Rupesh/demoprojects/GUI/serac_config.json"
    with open(config_path, 'w') as file:
        json.dump(config, file, indent=4)
    print(f"Serac Configurationsaved to {config_path}")

def update_ocr_config(sku):
    sku = int(sku)  # Ensure SKU is integer

    serac_config = {
        1: {"camera_config": "path/to/config", "camera_serial_number": "", "default_conf": 0.10, "iou_thersh": 0.95, "ocr_count": 0.05, "start_offset": 5, "bit_offset": 2},  # NEA
        2: {"camera_config": "path/to/config", "camera_serial_number": "", "default_conf": 0.10, "iou_thersh": 0.95, "ocr_count": 0.05, "start_offset": 5, "bit_offset": 2},  # Japan
        3: {"camera_config": "path/to/config", "camera_serial_number": "", "default_conf": 0.10, "iou_thersh": 0.95, "ocr_count": 0.05, "start_offset": 5, "bit_offset": 2},  # Aus
        4: {"camera_config": "path/to/config", "camera_serial_number": "", "default_conf": 0.10, "iou_thersh": 0.95, "ocr_count": 0.05, "start_offset": 5, "bit_offset": 2},  # Europe
        5: {"camera_config": "path/to/config", "camera_serial_number": "", "default_conf": 0.10, "iou_thersh": 0.95, "ocr_count": 0.05, "start_offset": 5, "bit_offset": 2},  # Korea
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
