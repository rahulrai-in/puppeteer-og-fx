call az group create -l australiaeast -n demo-rg 
call az storage account create --name <storage account name> --location australiaeast --resource-group demo-rg --sku Standard_LRS 
call az functionapp create --resource-group demo-rg --consumption-plan-location australiaeast --runtime node --functions-version 3 --name <function app name> --storage-account <storage account name> --os-type Linux
call func azure functionapp publish <function app name> --build remote
