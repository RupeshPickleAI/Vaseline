
import json
import sys

def save_cld_cam_config(config):
    config_path = "C:/Users/Rupesh/demoprojects/GUI/cld_cam_config.json"
    with open(config_path, 'w') as file:
        json.dump(config, file, indent=4)
    print(f"CLD Camera Configuration saved to {config_path}")

def update_cld_cam_config(sku):
    sku = int(sku)
    cld_cam_config = {
      1: {"camera_config":"path/to/config","default_confidence":0.55,"product_id":2,  "cld_count":16}, #comfort _blue_860_ml_morning fresh
      2: {"camera_config":"path/to/config","default_confidence":0.55,"product_id":4,  "cld_count":16}, #comfort pink 860 ml lily fresh
      3: {"camera_config":"path/to/config","default_confidence":0.55,"product_id":32,  "cld_count":16}, #comfort green 860 ml garden fresh
      4: {"camera_config":"path/to/config","default_confidence":0.55,"product_id":28,  "cld_count":16}, #comfort black 860 ml royale  
      5: {"camera_config":"path/to/config","default_confidence":0.55,"product_id":3,  "cld_count":16}, #comfort black 860 ml desire 
      6: {"camera_config":"path/to/config","default_confidence":0.2,"product_id":7,  "cld_count":12}, #surf_excel_matic_top_load_1_ltr .
      7: {"camera_config":"path/to/config","default_confidence":0.2,"product_id":29,  "cld_count":12}, #surf_excel_matic_front_load_1_ltr .
      8: {"camera_config":"path/to/config","default_confidence":0.55,"product_id":20,  "cld_count":20}, # surf execel matic top load 500 ml .
      9: {"camera_config":"path/to/config","default_confidence":0.55,"product_id":31,  "cld_count":20}, #surf excel matic front load  ml500 . 
      10: {"camera_config":"path/to/config","default_confidence":0.55,"product_id":21,  "cld_count":12}, #surf excel easy wash 1 ltr .
      11: {"camera_config":"path/to/config","default_confidence":0.55,"product_id":22,  "cld_count":12}, #surf excel eash wash 500 ml .
      12: {"camera_config":"path/to/config","default_confidence":0.55,"product_id":23,  "cld_count":16}, #surf excel quick wash 1 ltr .
      13: {"camera_config":"path/to/config","default_confidence":0.55,"product_id":24,  "cld_count":20}, #surf excel quick wash 500 ml .
      14: {"camera_config":"path/to/config","default_confidence":0.45,"product_id":30,  "cld_count":12}, #rin matic front load .
      15: {"camera_config":"path/to/config","default_confidence":0.45,"product_id":25,  "cld_count":12}, #rin matic top load .
}



    if sku in cld_cam_config:
        save_cld_cam_config(cld_cam_config[sku])
        print(f"CLD Config updated for SKU {sku}")
        return True
    else:
        print(f"No CLD config found for SKU {sku}")
        return False

if __name__ == "__main__":
    if len(sys.argv) > 1:
        try:
            sku = int(sys.argv[1])
            update_cld_cam_config(sku)
        except ValueError:
            print("Invalid SKU")
    else:
        print("Please provide SKU as argument.")
