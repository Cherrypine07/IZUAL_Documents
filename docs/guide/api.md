---
title: API interface
order: 8
toc: menu
translateHelp: true
---

## Background API

### Authentication

All interfaces need to bring the `validate` parameter, which is the same as the `server/validate` parameter value in the configuration file. Example:

```bash
$ curl localhost:5000/gethistory?validate=f8467b120f4ed91f94074a286113f10a
```

The interface returns:

```
{"code": 0, "message": "ok", "history": "[{\"type\": 1, \"text\": \"\\u4f1f\\u6d32 \\u4f60\\u597d\\uff01\\u8bd5\\u8bd5\\u5bf9\\u6211\\u558a\\u5524\\u9192\\u8bcd\\u53eb\\u9192\\u6211\\u5427\", \"time\": \"2019-02-07 19:10:19\", \"uuid\": \"f464d430-2ac8-11e9-bd1e-8c8590caf9a5\"}, {\"type\": 0, \"text\": \"\\u4eca\\u5929\\u5929\\u6c14\\u600e\\u4e48\\u6837\", \"time\": \"2019-02-07 19:10:33\", \"uuid\": \"fca4c218-2ac8-11e9-bd1e-8c8590caf9a5\"}, {\"type\": 1, \"text\": \"[Weather] \\u6df1\\u5733\\u5929\\u6c14\\uff1a\\u4eca\\u5929\\uff1a\\u591a\\u4e91\\uff0c20\\u523028\\u6444\\u6c0f\\u5ea6\\u3002\\u4eca\\u5929\\u5929\\u6c14\\u4e0d\\u9519\\uff0c\\u7a7a\\u6c14\\u6e05\\u65b0\\uff0c\\u9002\\u5408\\u51fa\\u95e8\\u8fd0\\u52a8\\u54e6\", \"time\": \"2019-02-07 19:10:33\", \"uuid\": \"fceec836-2ac8-11e9-bd1e-8c8590caf9a5\"}, {\"type\": 0, \"text\": \"\\u73b0\\u5728\\u51e0\\u70b9\", \"time\": \"2019-02-07 19:33:34\", \"uuid\": \"chat58b0d6a2-8395-1453-6383-4e27c421ea89\"}, {\"type\": 1, \"text\": \"2019\\u5e7402\\u670807\\u65e5 \\u661f\\u671f\\u56db \\u4e0b\\u5348 7:33\", \"time\": \"2021-10-01 14:23:03\", \"uuid\": \"3445dcd6-2acc-11e9-bd1e-8c8590caf9a5\"}]"}
```

### Manage

Used to restart IZUAL

- url: /operate
- method: POST
- parameter:

| Parameter name | Is it necessary | Description                                         |
| -------------- | --------------- | --------------------------------------------------- |
| validate       | Yes             | See [Authentication](#_1)                           |
| type           | is              | type. Currently there is only one type of `restart` |

- Example:

```sh
$ curl -X POST localhost:5000/operate -d "type=restart&validate=f8467b120f4ed91f94074a286113f10a"
```

- Ruturn:

| Field name | Description                         |
| ---------- | ----------------------------------- |
| code       | Return code. 0: Success; 1: Failure |
| message    | Result description                  |

### Log

Used to view the logs saved by IZUAL. For performance reasons, only the last 200 lines of content are returned by default, which is equivalent to doing a `tail -n 200` .

- url: /getlog
- method: GET
- parameter:

| Parameter name | Is it necessary | Description                                                |
| -------------- | --------------- | ---------------------------------------------------------- |
| validate       | Yes             | See [Authentication](#_1)                                  |
| lines          | Optional        | Maximum number of log lines read. The default value is 200 |

- Example:

```sh
$ curl localhost:5000/getlog?validate=f8467b120f4ed91f94074a286113f10a&lines=10
```

- return:

| Field name | Description                         |
| ---------- | ----------------------------------- |
| code       | Return code. 0: Success; 1: Failure |
| message    | Result description                  |
| log        | Log content                         |

### Conversation

#### Start a conversation

Used to initiate a conversation

- url: /chat
- method: POST
- parameter:

| Parameter name | Is it necessary                       | Description                                                                                                                           |
| -------------- | ------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| validate       | Yes                                   | See [Authentication](#_1)                                                                                                             |
| type           | is                                    | query type. "text": text type query; "voice": voice type query                                                                        |
| query          | Only required when the type is "text" | The value after the urlencode of the content that initiates the conversation. For example, the urlencode result of "What time is it?" |
| uuid           | Only required when type is "text"     | A uuid assigned to this text query. For example, random characters + timestamp can be used.                                           |
| voice          | Only required when type is "voice"    | Voice. It needs to be a base64 encoding of single-channel wav format voice with a sampling rate of 16k.                               |

- Example:

```sh
$ curl -X POST localhost:5000/chat -d "type=text&query=%E7%8E%B0%E5%9C%A8%E5%87%A0%E7%82%B9&validate=f8467b120f4ed91f94074a286113f10a&uuid=chated17be5d-0240-c9ba-2b2e-7eb98588cf34"
```

- Return:

| Parameter name | Description                         |
| -------------- | ----------------------------------- |
| code           | Return code. 0: Success; 1: Failure |
| message        | Result description                  |

#### Conversation History

Used to view all session records from the start of IZUAL to the present

- url: /gethistory
- method: GET
- parameter:

| Parameter name | Is it necessary | Description               |
| -------------- | --------------- | ------------------------- |
| validate       | Yes             | See [Authentication](#_1) |

- Example:

```sh
$ curl localhost:5000/gethistory?validate=f8467b120f4ed91f94074a286113f10a
```

- Return:

| Field name | Description                         |
| ---------- | ----------------------------------- |
| code       | Return code. 0: success; 1: failure |
| message    | Result description                  |
| history    | Session history                     |

### Configuration

#### View configuration

Used to view the existing configuration of IZUAL.

- url: /getconfig
- method: GET
- Parameters:

| Parameter name | Is it necessary | Description                                                                                                                                                                                                                                                       |
| -------------- | --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| validate       | Yes             | See [Authentication](#_1)                                                                                                                                                                                                                                         |
| key            | Optional        | The key value of a certain configuration. For example: `robot_name_cn`. If you want the corresponding value of a multi-level key, use the form of `/first-level key/second-level key/...`, such as `/ server/host` can take the `host` configuration of `server`. |

- Example:

```sh
$ curl localhost:5000/getconfig?validate=f8467b120f4ed91f94074a286113f10a\&key=server
```

- Return:

| Field name | Description                                                                                                                               |
| ---------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| code       | Return code. 0: Success; 1: Failure                                                                                                       |
| message    | Result description                                                                                                                        |
| config     | All configurations, only provided when the `key` parameter is not passed                                                                  |
| value      | The configuration provided by `key` is only provided when the `key` parameter is passed; if the `key` is not found, it will return `null` |

#### Change setting

Used to configure IZUAL

- url: /config
- method: POST
- parameters:

| Parameter name | Is it necessary | Description                                                                     |
| -------------- | --------------- | ------------------------------------------------------------------------------- |
| validate       | Yes             | See [Authentication](#_1)                                                       |
| config         | Yes             | Configuration content, must be the value of yaml parseable text after urlencode |

- Example:

```sh
$ curl -X localhost:5000/config -d "config=robot_name_cn%3A+'%E5%AD%99%E6%82%9F%E7%A9%BA'%0Afirst_name%3A+'%E4%BC%9F%E6%B4%B2'%0Alast_name%3A+'%E6%BD%98'%0Atimezone%3A+HKT%0Alocation%3A+'%E6%B7%B1%E5%9C%B3'%0A%0A%23+%E5%90%8E%E5%8F%B0%E7%AE%A1%E7%90%86%E7%AB%AF%0Aserver%3A%0A++++enable%3A+true%0A++++host%3A+'0.0.0.0'++%23+ip+%E5%9C%B0%E5%9D%80%0A++++port%3A+'5000'+++++%23+%E7%AB%AF%E5%8F%A3%E5%8F%B7++++%0A++++username%3A+'izual'..."
```

- Return:

| Field name | Description                         |
| ---------- | ----------------------------------- |
| code       | Return code. 0: Success; 1: Failure |
| message    | Result description                  |
