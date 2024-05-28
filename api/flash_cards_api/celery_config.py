from celery import Celery


def make_celery():
	# in the future add redis backend and broker to store the results
	celery = Celery(
		main="api.app.celery",
	)

	celery.conf.update(
		{
			"task_track_started": True,
            "result_persistent": False,
            "task_serializer": "json",
            "result_serializer": "json",
            "accept_content": ["json"],
			"imports": (
				# 	add tasks here
			)
		}
	)

	return celery
