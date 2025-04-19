
import json
import sys

def save_front_cam_config(config):
    config_path = "C:/Users/Rupesh/demoprojects/GUI/front_cam_config.json"
    with open(config_path, 'w') as file:
        json.dump(config, file, indent=4)
    print(f"Front Camera Configuration saved to {config_path}")

def update_front_cam_config(sku):
    sku = int(sku)
    front_cam_configs = {
        1: {"model_weights":"path/to/model","camera_config":"path/to/config","tear_confidence":0.35,"default_confidence":0.25,"product_id":2, "loose_cap_height":20, "loose_cap_class":3, "dent_class":2, "tear_class":4, "cap_class":1, "sleeve_class":1, "inner_cap":1}, #comfort _blue_860_ml_morning fresh
        2: {"model_weights":"path/to/model","camera_config":"path/to/config","tear_confidence":0.35,"default_confidence":0.25,"product_id":4, "loose_cap_height":20, "loose_cap_class":3, "dent_class":2, "tear_class":4, "cap_class":1, "sleeve_class":1, "inner_cap":1}, #comfort pink 860 ml lily fresh
        3: {"model_weights":"path/to/model","camera_config":"path/to/config","tear_confidence":0.35,"default_confidence":0.25,"product_id":32, "loose_cap_height":20, "loose_cap_class":3, "dent_class":2, "tear_class":4, "cap_class":1, "sleeve_class":1, "inner_cap":1}, #comfort green 860 ml garden fresh     
        4: {"model_weights":"path/to/model","camera_config":"path/to/config","tear_confidence":0.55,"default_confidence":0.55,"product_id":28, "loose_cap_height":45, "loose_cap_class":3, "dent_class":2, "tear_class":4, "cap_class":1, "sleeve_class":1, "inner_cap":1}, #comfort black 860 ml royale 
        5: {"model_weights":"path/to/model","camera_config":"path/to/config","tear_confidence":0.55,"default_confidence":0.55,"product_id":3, "loose_cap_height":45, "loose_cap_class":3, "dent_class":2, "tear_class":4, "cap_class":1, "sleeve_class":1, "inner_cap":1}, #comfort black 860 ml desire  
        6: {"model_weights":"path/to/model","camera_config":"path/to/config","tear_confidence":0.15,"default_confidence":0.15,"product_id":7, "loose_cap_height":45, "loose_cap_class":3, "dent_class":2, "tear_class":5, "cap_class":1, "sleeve_class":1, "inner_cap":1}, #surf_excel_matic_top_load_1_ltr .
        7: {"model_weights":"path/to/model","camera_config":"path/to/config","tear_confidence":0.15,"default_confidence":0.15,"product_id":29, "loose_cap_height":45, "loose_cap_class":3, "dent_class":2, "tear_class":5, "cap_class":1, "sleeve_class":1, "inner_cap":1}, #surf_excel_matic_front_load_1_ltr .
        8: {"model_weights":"path/to/model","camera_config":"path/to/config","tear_confidence":0.7,"default_confidence":0.7,"product_id":20, "loose_cap_height":45, "loose_cap_class":3, "dent_class":2, "tear_class":6, "cap_class":1, "sleeve_class":1, "inner_cap":4}, # surf execel matic top load 500 ml .
        9: {"model_weights":"path/to/model","camera_config":"path/to/config","tear_confidence":0.7,"default_confidence":0.7,"product_id":31, "loose_cap_height":45, "loose_cap_class":3, "dent_class":2, "tear_class":6, "cap_class":1, "sleeve_class":1, "inner_cap":4}, #surf excel matic front load  ml500 .
        10: {"model_weights":"path/to/model","camera_config":"path/to/config","tear_confidence":0.2,"default_confidence":0.2,"product_id":21, "loose_cap_height":60, "loose_cap_class":3, "dent_class":2, "tear_class":5, "cap_class":1, "sleeve_class":1, "inner_cap":1}, #surf excel easy wash 1 ltr .
        11: {"model_weights":"path/to/model","camera_config":"path/to/config","tear_confidence":0.2,"default_confidence":0.45,"product_id":22, "loose_cap_height":60, "loose_cap_class":3, "dent_class":2, "tear_class":5, "cap_class":1, "sleeve_class":1, "inner_cap":1}, #surf excel eash wash 500 ml .
        12: {"model_weights":"path/to/model","camera_config":"path/to/config","tear_confidence":0.45,"default_confidence":0.45,"product_id":23, "loose_cap_height":35, "loose_cap_class":3, "dent_class":2, "tear_class":5, "cap_class":1, "sleeve_class":1, "inner_cap":1}, #surf excel quick wash 1 ltr .
        13: {"model_weights":"path/to/model","camera_config":"path/to/config","tear_confidence":0.45,"default_confidence":0.45,"product_id":24, "loose_cap_height":35, "loose_cap_class":3, "dent_class":2, "tear_class":5, "cap_class":1, "sleeve_class":1, "inner_cap":1}, #surf excel quick wash 500 ml .
        14: {"model_weights":"path/to/model","camera_config":"path/to/config","tear_confidence":0.15,"default_confidence":0.15,"product_id":30, "loose_cap_height":45, "loose_cap_class":3, "dent_class":2, "tear_class":5, "cap_class":1, "sleeve_class":4, "inner_cap":1}, #rin matic front load .
        15: {"model_weights":"path/to/model","camera_config":"path/to/config","tear_confidence":0.15,"default_confidence":0.15,"product_id":25, "loose_cap_height":45, "loose_cap_class":3, "dent_class":2, "tear_class":5, "cap_class":1, "sleeve_class":4, "inner_cap":1}, #rin matic top load .
    }
    if sku in front_cam_configs:
        save_front_cam_config(front_cam_configs[sku])
        print(f"Front Camera Config updated for SKU {sku}")
        return True
    else:
        print(f"No config defined for SKU {sku}")
        return False

if __name__ == "__main__":
    if len(sys.argv) > 1:
        try:
            sku = int(sys.argv[1])
            update_front_cam_config(sku)
        except ValueError:
            print("Invalid SKU")
    else:
        print("Please provide SKU as argument.")
